// backend/models/house.js
const mongoose = require('mongoose');

// Define the schema for individual rooms
const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    title: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: [{ type: String }],
    amenities: [{ type: String }]
  },
  { _id: false } // prevents duplicate _id inside room array
);

// Define the schema for the entire house
const houseSchema = new mongoose.Schema(
  {
    landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    image: { type: String, default: null },
    rooms: [roomSchema],

    // ✅ New field for admin approval
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model('House', houseSchema);

