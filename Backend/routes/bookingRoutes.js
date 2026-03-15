// backend/routes/bookingRoutes.js
const express = require('express');
const { reserveRoom, confirmReservation, bookRoomDirect, cancelReservation, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/reserve', protect, authorize('student'), reserveRoom);
router.post('/confirm', protect, authorize('student'), confirmReservation);
router.post('/book', protect, authorize('student'), bookRoomDirect);
router.post('/cancel', protect, authorize('student'), cancelReservation);
router.get('/my', protect, authorize('student'), getMyBookings);
router.get('/', protect, authorize('admin'), getAllBookings);

module.exports = router;

