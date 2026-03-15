// backend/controllers/paymentController.js
const Booking = require('../models/booking');
const Commission = require('../models/commission');

// Initialize (mock) Paystack
exports.initializePaystack = async (req, res) => {
  try {
    const { amount, email, bookingId } = req.body;
    const fakeReference = "TEST_REF_" + Date.now();
    const redirectUrl = `${process.env.CLIENT_URL}/payment-callback?reference=${fakeReference}&bookingId=${bookingId}`;

    return res.json({
      status: true,
      message: "Mock Paystack initialized successfully",
      data: { authorization_url: redirectUrl }
    });
  } catch (err) {
    console.error('Pay init error', err);
    res.status(500).json({ message: 'Failed to initialize payment' });
  }
};

// Verify (mock)
exports.verifyPaystack = async (req, res) => {
  try {
    const { reference, bookingId } = req.query;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'confirmed';
    booking.payReference = reference || 'TEST_PAYMENT';
    await booking.save();

    if (booking.commission && booking.commission > 0) {
      await Commission.create({ booking: booking._id, amount: booking.commission });
    }

    res.json({ message: 'Payment verified (mock)', booking });
  } catch (err) {
    console.error('Pay verify error', err);
    res.status(500).json({ message: 'Payment verification failed' });
  }
};

