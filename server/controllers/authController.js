const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // 👈 THIS IS THE MISSING LINK

// Helper function to generate a Token (The digital ID card)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, location, skills } = req.body;

        // 1. Validation: specific checks can go here
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // 2. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash the password (Encrypt it)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Save the encrypted version
            location,
            skills
        });

        // 5. Send response
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                location: user.location,
                skills: user.skills,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check for user email
        const user = await User.findOne({ email });

        // 2. Check password (compare plain text to encrypted hash)
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                walletBalance: user.walletBalance, // Send their hours balance
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user data (Me)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};