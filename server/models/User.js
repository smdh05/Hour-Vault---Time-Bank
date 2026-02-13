const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    skills: { type: [String] }, // Array of strings
    walletBalance: { type: Number, default: 5 }, // Everyone starts with 5 hours
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);