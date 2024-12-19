import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the JWT token from localStorage
        localStorage.removeItem('jwtToken');
        
        // Redirect to the SignIn page
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Welcome to the Dashboard</h1>

                {/* Logout button */}
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
