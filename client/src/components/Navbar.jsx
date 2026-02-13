import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged out successfully");
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-400">HourVault ⏳</Link>
            
            <div className="flex items-center space-x-6">
                <Link to="/" className="hover:text-blue-300 transition">Home</Link>
                
                {user ? (
                    <>
                        {/* 👇 NEW: This button lets you become a Teacher! */}
                        <Link to="/post-service" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition font-bold">
                            + Post Service
                        </Link>

                        <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
                            <span className="text-gray-300">Hello, {user.name}</span>
                            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-semibold">Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-300 transition">Login</Link>
                        <Link to="/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition font-bold">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;