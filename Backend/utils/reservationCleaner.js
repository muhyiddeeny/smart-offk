// backend/controllers/bookingController.js
const Booking = require('../models/booking');
const House = require('../models/house');
const mongoose = require('mongoose');

// Create a booking (student reserves a room)
exports.createBooking = async (req, res) => {
  try {
    const { houseId, roomId, studentId } = req.body;

    const house = await House.findById(houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });

    const room = house.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.available) return res.status(400).json({ message: 'Room already booked' });

    // Prevent double booking by the same student
    const existing = await Booking.findOne({
      student: studentId,
      status: { $in: ['reserved', 'paid'] },
    });
    if (existing) return res.status(400).json({ message: 'You already have an active booking' });

    // Reserve room for 24 hours
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const booking = await Booking.create({
      student: studentId,
      house: houseId,
      roomId,
      status: 'reserved',
      expiresAt,
    });

    room.available = false;
    await house.save();

    res.status(201).json({ message: 'Room reserved successfully', booking });
  } catch (err) {
    console.error('Booking creation error:', err.message);
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('student house');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// Get booking by student
exports.getBookingByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const booking = await Booking.findOne({ student: studentId }).populate('house');
    if (!booking) return res.status(404).json({ message: 'No booking found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch booking' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    await House.updateOne(
      { _id: booking.house, 'rooms._id': booking.roomId },
      { $set: { 'rooms.$.available': true } }
    );

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

