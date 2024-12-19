import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        aadharNumber: ''
    })
    
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        // Aadhar validation (ensure it's 12 digits)
        if (formData.aadharNumber.length !== 12) {
            setMessage('Please enter a valid 12-digit Aadhar number.')
            return
        }
    
        // Sending data to the server running on localhost:5000
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Send the whole formData object
        })
    
        const data = await response.json()
    
        if (response.ok) {
            setMessage('Sign up successful!') // Show success message
        } else {
            setMessage('Sign up failed. Please try again.') // Show error message
        }
    
        console.log(data)
        setFormData({ name: '', aadharNumber: '' }) // Clear the form data after submit
    }
    

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1"> Name </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-300 mb-1"> Aadhar Number </label>
                        <input
                            type="text"
                            id="aadharNumber"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter your Aadhar number"
                            pattern="\d{12}"
                            title="Please enter a valid 12-digit Aadhar number"
                        />
                    </div>

                    <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200">
                        Sign Up
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-center text-sm text-gray-400">
                        {message}
                    </p>
                )}

                <p className="mt-4 text-center text-sm text-gray-400">
                    <span>
                        Already have an account?{' '}
                    </span>

                    <Link to="/signin" className="text-purple-400 hover:text-purple-300">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage;
