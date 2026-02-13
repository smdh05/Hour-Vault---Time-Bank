const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    costInHours: { type: Number, required: true },
    status: { type: String, default: 'Open' }, // Open -> In Progress -> Completed
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Who requested it
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);