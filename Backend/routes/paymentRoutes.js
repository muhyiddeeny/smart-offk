// backend/routes/paymentRoutes.js
const express = require('express');
const { initializePaystack, verifyPaystack } = require('../controllers/paymentController');
const router = express.Router();

router.post('/paystack/init', initializePaystack);
router.get('/paystack/verify', verifyPaystack);

module.exports = router;

