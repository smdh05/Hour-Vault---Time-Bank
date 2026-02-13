const Service = require('../models/Service');
const User = require('../models/User');

// Get all services
const getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('provider', 'name email');
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a service
const createService = async (req, res) => {
    const { title, description, category, costInHours } = req.body;
    if (!title || !description || !category || !costInHours) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    try {
        const service = await Service.create({
            provider: req.user._id,
            title,
            description,
            category,
            costInHours
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get My Services (For Profile)
const getMyServices = async (req, res) => {
    try {
        const services = await Service.find({ provider: req.user._id });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 1: Buyer Requests Service (Deduct from Buyer, Hold in Limbo)
const requestService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        const buyer = await User.findById(req.user._id);

        if (!service) return res.status(404).json({ message: 'Service not found' });
        if (service.status !== 'Open') return res.status(400).json({ message: 'Service already taken' });
        if (service.provider.toString() === req.user._id.toString()) return res.status(400).json({ message: 'Cannot buy your own service' });

        if (buyer.walletBalance < service.costInHours) {
            return res.status(400).json({ message: 'Not enough time credits!' });
        }

        // Deduct from Buyer
        buyer.walletBalance -= service.costInHours;
        await buyer.save();

        // Update Service
        service.buyer = req.user._id;
        service.status = 'In Progress';
        await service.save();

        res.status(200).json({ message: 'Service requested! Funds deducted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Step 2: Seller Verifies Completion (Add to Seller)
const confirmCompletion = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) return res.status(404).json({ message: 'Service not found' });
        
        // Only Seller can click this
        if (service.provider.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (service.status !== 'In Progress') {
            return res.status(400).json({ message: 'Service is not in progress' });
        }

        // Add to Seller
        const seller = await User.findById(req.user._id);
        seller.walletBalance += service.costInHours;
        await seller.save();

        service.status = 'Completed';
        await service.save();

        res.status(200).json({ message: 'Job Verified! Hours added to wallet.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });
        if (service.provider.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        await service.deleteOne();
        res.json({ message: 'Service removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getServices, createService, getMyServices, requestService, confirmCompletion, deleteService };