// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  house: { type: mongoose.Schema.Types.ObjectId, ref: 'House', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['reserved','pending','confirmed','cancelled'], default: 'reserved' },
  commission: { type: Number, default: 0 },
  reservedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  payReference: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
