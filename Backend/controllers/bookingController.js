// backend/controllers/bookingController.js
const Booking = require('../models/booking');
const House = require('../models/house');
const Commission = require('../models/commission');

const COMMISSION_RATE = Number(process.env.COMMISSION_RATE || 0.05);

exports.reserveRoom = async (req, res) => {
  try {
    const { houseId, roomId, reserveMinutes } = req.body;
    const house = await House.findById(houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });
    const room = house.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.available) return res.status(400).json({ message: 'Room not available' });

    room.available = false;
    await house.save();

    const amount = room.price;
    const expiresAt = new Date(Date.now() + (Number(reserveMinutes || 30) * 60 * 1000));
    const booking = await Booking.create({
      house: house._id,
      roomId: room._id,
      student: req.user._id,
      amount,
      status: 'reserved',
      reservedAt: new Date(),
      expiresAt,
      commission: Number((amount * COMMISSION_RATE).toFixed(2))
    });

    res.status(201).json({ message: 'Room reserved', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.confirmReservation = async (req, res) => {
  try {
    const { bookingId, payReference } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status === 'cancelled') return res.status(400).json({ message: 'Reservation cancelled' });

    booking.status = 'confirmed';
    booking.payReference = payReference || booking.payReference;
    await booking.save();

    if (booking.commission && booking.commission > 0) {
      await Commission.create({ booking: booking._id, amount: booking.commission });
    }

    res.json({ message: 'Booking confirmed', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bookRoomDirect = async (req, res) => {
  try {
    const { houseId, roomId } = req.body;
    const house = await House.findById(houseId);
    if (!house) return res.status(404).json({ message: 'House not found' });
    const room = house.rooms.id(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.available) return res.status(400).json({ message: 'Room not available' });

    room.available = false;
    await house.save();

    const amount = room.price;
    const commission = Number((amount * COMMISSION_RATE).toFixed(2));
    const booking = await Booking.create({ house: house._id, roomId: room._id, student: req.user._id, amount, status: 'confirmed', commission });

    if (commission > 0) await Commission.create({ booking: booking._id, amount: commission });

    res.status(201).json({ message: 'Booked', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'reserved') return res.status(400).json({ message: 'Only reserved can be cancelled' });

    booking.status = 'cancelled';
    await booking.save();

    await House.updateOne({ _id: booking.house, 'rooms._id': booking.roomId }, { $set: { 'rooms.$.available': true } });

    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user._id }).populate('house');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('house').populate('student', 'name email');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


