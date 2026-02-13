const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Import the database connection function
// NOTICE: No curly braces { } around connectDB
const connectDB = require('./db'); 

// Import Route files
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Allows server to read JSON data
app.use(cors());         // Allows frontend to talk to backend

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);

// Simple Test Route
app.get('/', (req, res) => {
    res.send('HourVault API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});