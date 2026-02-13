import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Home = () => {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            fetchServices();
        }
    }, []);

    const fetchServices = async () => {
        try {
            const res = await API.get('/services');
            setServices(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRequest = async (serviceId) => {
        try {
            await API.post(`/services/${serviceId}/request`);
            toast.success("Service Requested! Hours deducted.");
            fetchServices(); // Refresh list
            setTimeout(() => window.location.reload(), 1500); // Update wallet balance
        } catch (err) {
            toast.error(err.response?.data?.message || "Transaction Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {user ? (
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
                            <p className="text-gray-600">Explore the marketplace.</p>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-lg text-center">
                            <span className="block text-sm text-blue-600 font-bold uppercase">Wallet</span>
                            <span className="text-4xl font-extrabold text-blue-800">{user.walletBalance || 5} Hrs</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Services</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service._id} className="bg-white p-6 rounded-lg shadow border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-xl text-gray-800">{service.title}</h3>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold">
                                        {service.costInHours} Hours
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 h-16 overflow-hidden">{service.description}</p>
                                
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">By: {service.provider?.name || 'Unknown'}</span>

                                    {service.provider?._id === user._id || service.provider === user._id ? (
                                        <span className="text-gray-400 font-bold text-sm italic">My Post</span>
                                    ) : service.status === 'Open' ? (
                                        <button 
                                            onClick={() => handleRequest(service._id)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-700 transition"
                                        >
                                            Request Service
                                        </button>
                                    ) : (
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm font-bold">
                                            {service.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center mt-20">
                    <h1 className="text-5xl font-bold mb-4">HourVault</h1>
                    <p className="text-xl mb-8">Login to start trading time.</p>
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded">Login Now</Link>
                </div>
            )}
        </div>
    );
};

export default Home;