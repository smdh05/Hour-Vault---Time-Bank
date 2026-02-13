// client/src/api/axios.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Points to your Node Server
});

// Automatically add the token to every request if we have one
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;