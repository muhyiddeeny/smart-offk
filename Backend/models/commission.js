// backend/models/Commission.js
const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commission', commissionSchema);

