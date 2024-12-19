import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

function SignIn() {
    const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if MetaMask is installed
    useEffect(() => {
        setIsMetamaskInstalled(!!window.ethereum);

        // Automatically redirect to dashboard if already logged in
        const token = localStorage.getItem('jwtToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    async function handleMetamaskLogin() {
        try {
            if (!isMetamaskInstalled) {
                alert('Please install MetaMask to continue.');
                return;
            }

            if (ethers && ethers.providers && ethers.providers.Web3Provider) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                try {
                    await provider.send("eth_requestAccounts", []); // Request user's MetaMask account
                } catch (error) {
                    alert("User denied account access.");
                    return;
                }

                const signer = provider.getSigner();
                const address = await signer.getAddress();
                console.log(address);

                // Backend interaction to get nonce
                const response = await fetch('http://localhost:5000/api/nonce', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ address }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    console.error(error);
                    alert('Failed to get nonce.');
                    return;
                }

                const resp = await response.json();
                const nonce = resp.message;
                console.log(nonce);

                const signedMessage = await signer.signMessage(nonce);
                const data = { signedMessage, nonce, address };

                const authResponse = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const token = await authResponse.json();
                console.log(token);

                // Store JWT token in local storage
                localStorage.setItem('jwtToken', token.token);

                // Redirect to dashboard
                navigate('/dashboard');
            } else {
                alert('MetaMask not detected.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to login with MetaMask. Please try again.');
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Welcome</h1>
                <div className="space-y-4">
                    {isLoggedIn ? 
                        (
                            <>
                                <Link to="/dashboard" className="block w-full">
                                    <button className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200" disabled={!isMetamaskInstalled} >
                                        Dashboard
                                    </button>
                                </Link>
                            </>
                        ) : (
                            <button onClick={handleMetamaskLogin} className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200" disabled={!isMetamaskInstalled} >
                                Log in with MetaMask
                            </button>
                        )
                    }

                    <Link to="/signup" className="block w-full">
                        <button className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200">
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
