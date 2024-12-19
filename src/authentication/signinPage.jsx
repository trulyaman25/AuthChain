import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignInPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setFormData({ email: '', password: '' })
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1"> Email </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1"> Password </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200" >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-400"> 
                    <span>
                        Don't have an account?{' '}
                    </span>
                    <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignInPage;