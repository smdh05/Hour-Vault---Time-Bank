import { useEffect, useState } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        fetchMyServices();
    }, []);

    const fetchMyServices = async () => {
        try {
            const res = await API.get('/services/my');
            setMyServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleVerify = async (id) => {
        try {
            await API.post(`/services/${id}/verify`);
            toast.success("Job Verified! You got paid.");
            fetchMyServices(); // Refresh list immediately
            
            // Reload page to update wallet balance in header
            setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed");
        }
    };

    const handleDelete = async (id) => {
        if(!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await API.delete(`/services/${id}`);
            toast.success("Service Deleted");
            fetchMyServices();
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    if (!user) return <div className="p-10 text-center text-xl">Loading your profile...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                
                {/* --- HEADER --- */}
                <div className="bg-white p-8 rounded-lg shadow-md mb-8 flex justify-between items-center border-l-8 border-blue-600">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800">MY DASHBOARD</h1>
                        <p className="text-gray-500 mt-1">Manage your jobs and earnings</p>
                        <p className="text-sm font-bold text-blue-600 mt-2">{user.email}</p>
                    </div>
                    <div className="text-right bg-gray-50 p-4 rounded-lg">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide font-bold">Wallet Balance</span>
                        <span className="text-5xl font-extrabold text-green-600">{user.walletBalance || 5}</span>
                        <span className="text-gray-400 ml-2 font-bold text-xl">Hrs</span>
                    </div>
                </div>

                {/* --- JOB LIST --- */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">My Posted Jobs</h2>
                
                {myServices.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded shadow">
                        <p className="text-gray-500 text-lg">You haven't posted any jobs yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {myServices.map((service) => (
                            <div key={service._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-center gap-4">
                                
                                {/* Job Details */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl text-gray-900">{service.title}</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                                            {service.costInHours} Hours
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                            (service.status || '').toLowerCase() === 'completed' ? 'bg-green-100 text-green-700' : 
                                            (service.status || '').toLowerCase() === 'in progress' ? 'bg-yellow-100 text-yellow-700' : 
                                            'bg-blue-100 text-blue-700'
                                        }`}>
                                            {service.status}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {/* 👇 ROBUST CHECK: Works for "In Progress" OR "in progress" */}
                                    {(service.status || '').toLowerCase() === 'in progress' && (
                                        <button 
                                            onClick={() => handleVerify(service._id)}
                                            className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition font-bold"
                                        >
                                            ✅ Verify & Get Paid
                                        </button>
                                    )}

                                    {(service.status || '').toLowerCase() === 'open' && (
                                        <button 
                                            onClick={() => handleDelete(service._id)}
                                            className="bg-red-50 text-red-600 px-4 py-3 rounded hover:bg-red-100 transition font-bold border border-red-200"
                                        >
                                            Delete
                                        </button>
                                    )}

                                    {(service.status || '').toLowerCase() === 'completed' && (
                                        <span className="text-gray-400 font-bold italic px-4 py-2 border rounded bg-gray-50">
                                            Paid & Closed
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;