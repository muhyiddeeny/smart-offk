
// //backend/controllers/houseController.js
// const House = require('../models/house');

// exports.createHouse = async (req, res) => {
//   try {
//     const { title, address, description, rooms } = req.body;

//     // handle image upload
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     // parse rooms (sent as JSON string from frontend)
//     const parsedRooms = rooms ? JSON.parse(rooms) : [];

//     // create new house
//     const house = await House.create({
//       landlord: req.user._id,
//       title,
//       address,
//       description,
//       image,
//       rooms: parsedRooms,
//     });

//     res.status(201).json({
//       message: 'House created successfully',
//       house,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all houses
// exports.getHouses = async (req, res) => {
//   try {
//     const houses = await House.find().populate('landlord', 'name email');
//     res.json(houses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get single house by ID
// exports.getHouseById = async (req, res) => {
//   try {
//     const house = await House.findById(req.params.id).populate('landlord', 'name email');
//     if (!house) return res.status(404).json({ message: 'House not found' });
//     res.json(house);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const House = require('../models/house');

// Create House (Set to pending by default)
exports.createHouse = async (req, res) => {
  try {
    const { title, address, description, rooms } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const parsedRooms = rooms ? JSON.parse(rooms) : [];

    const house = await House.create({
      landlord: req.user._id,
      title,
      address,
      description,
      image,
      rooms: parsedRooms,
      approved: false 
    });

    res.status(201).json({ message: 'House created, awaiting admin approval', house });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Students see only APPROVED houses
exports.getHouses = async (req, res) => {
  try {
    const houses = await House.find({ approved: true }).populate('landlord', 'name email');
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Landlords see only THEIR houses
exports.getMyHouses = async (req, res) => {
  try {
    const houses = await House.find({ landlord: req.user._id });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id).populate('landlord', 'name email');
    if (!house) return res.status(404).json({ message: 'House not found' });
    res.json(house);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
