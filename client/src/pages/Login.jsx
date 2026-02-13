// client/src/pages/Login.jsx
import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', formData);
            
            // Save token and user info
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            
            toast.success('Login Successful!');
            navigate('/'); // Go to Home/Dashboard
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid Credentials');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                
                <input 
                    name="email" type="email" placeholder="Email" 
                    onChange={handleChange} required 
                    className="w-full p-2 mb-4 border rounded" 
                />
                <input 
                    name="password" type="password" placeholder="Password" 
                    onChange={handleChange} required 
                    className="w-full p-2 mb-4 border rounded" 
                />
                
                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Login
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    New here? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;