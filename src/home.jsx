import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
            <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Welcome</h1>
                <div className="space-y-4">
                <Link to="/signin" className="block w-full">
                    <button className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200">
                    Sign In
                    </button>
                </Link>
                <Link to="/signup" className="block w-full">
                    <button className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200">
                    Sign Up
                    </button>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;