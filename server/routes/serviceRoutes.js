const express = require('express');
const router = express.Router();
const { 
    getServices, 
    createService, 
    getMyServices, 
    requestService, 
    confirmCompletion, 
    deleteService 
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/', protect, createService);
router.get('/my', protect, getMyServices);
router.post('/:id/request', protect, requestService);   // Buyer clicks "Request"
router.post('/:id/verify', protect, confirmCompletion); // Seller clicks "Verify"
router.delete('/:id', protect, deleteService);

module.exports = router;