import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostService = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        costInHours: 1
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/services', formData);
            toast.success('Service Posted Successfully!');
            navigate('/');
        } catch (err) {
            console.error(err); // Check console for real error
            toast.error(err.response?.data?.message || 'Failed to post service');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Post a Request</h2>
                <input name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
                <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
                <input name="category" placeholder="Category" onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
                <input name="costInHours" type="number" min="1" placeholder="Cost (Hours)" onChange={handleChange} required className="w-full p-2 mb-3 border rounded" />
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Post Now</button>
            </form>
        </div>
    );
};

export default PostService;