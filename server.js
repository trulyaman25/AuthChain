import express from 'express';
import mongoose from 'mongoose';
import { ethers } from 'ethers';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

dotenv.config();

const port = process.env.PORT || 5000;
const secretKey = process.env.SECRET_KEY;
const uri = process.env.MONGODB_URI;

app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aadharNumber: { type: Number, required: true, unique: true },
    blockchainAddress: { type: String, required: true }
});
const User = mongoose.models.patient || mongoose.model('patient', userSchema);

// Connect to DB
connectDB();

// Signup Route
app.post('/api/signup', async (req, res) => {
    const { name, aadharNumber } = req.body;
    try {
        // Check if Aadhar number already exists
        const existingUser = await User.findOne({ aadharNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this Aadhar number has already registered' });
        }

        // Generate Ethereum wallet
        const wallet = ethers.Wallet.createRandom();
        const blockchainAddress = wallet.address;
        const blockchainPrivateKey = wallet.privateKey;

        // Save user data in the DB
        const newUser = new User({ name, aadharNumber, blockchainAddress });
        await newUser.save();

        // Respond with private key (in a real app, you should never expose private keys like this)
        res.status(200).json({ message: blockchainPrivateKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during signup' });
    }
});

// Nonce Route
app.post('/api/nonce', async (req, res) => {
    const { address } = req.body;
    try {
        const addressExists = await User.findOne({ blockchainAddress: address });
        if (!addressExists) {
            return res.status(400).json({ message: 'Please register first' });
        }

        const nonce = crypto.randomBytes(32).toString('hex');
        res.status(200).json({ message: nonce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while generating nonce' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const { signedMessage, nonce, address } = req.body;
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);
    console.log(recoveredAddress);
    if (recoveredAddress !== address) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  
    // Generate the JWT token
    const token = jwt.sign({ address }, secretKey, { expiresIn: '25s' });
    console.log(token);
  
    // Send the JWT token to the frontend
    res.status(200).json({ token });
});

// Verify Route
app.post('/api/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, secretKey);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp < currentTime) {
        res.json({ message: 'Expired' });
        } else {
        res.json({ message: 'Valid' });
        }
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});