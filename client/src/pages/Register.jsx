import { useState } from 'react';
import API from '../api/axios'; // Connects to your backend
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        skills: ''
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert "Java, React" string into an array ["Java", "React"]
            const payload = {
                ...formData,
                skills: formData.skills.split(',').map(skill => skill.trim())
            };

            // Send POST request to your Backend
            const res = await API.post('/auth/register', payload);
            
            // Save the Token and User info (Auto-login after register)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data));
            
            toast.success('Registration Successful!');
            navigate('/'); // Redirect to Home Page
        } catch (err) {
            // Show error from backend (e.g., "User already exists")
            toast.error(err.response?.data?.message || 'Registration Failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">Join HourVault</h2>
                
                <div className="space-y-4">
                    <input 
                        name="name" 
                        placeholder="Full Name" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    />
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    />
                    <input 
                        name="location" 
                        placeholder="Location (e.g. Pune)" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    />
                    <input 
                        name="skills" 
                        placeholder="Skills (comma separated)" 
                        onChange={handleChange} 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                    />
                </div>
                
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6 font-bold hover:bg-blue-700 transition duration-200">
                    Create Account
                </button>
                
                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already a member? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;