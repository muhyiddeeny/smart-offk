


// // backend/routes/houseRoutes.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { createHouse, getHouses, getHouseById } = require('../controllers/houseController');
// const { protect, authorize } = require('../middleware/auth');
// const House = require('../models/house');
// const router = express.Router();

// // ===== Multer setup for image upload =====
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // folder to store uploaded images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });

// const upload = multer({ storage });

// // ===== Routes =====

// // Get all houses
// router.get('/', getHouses);

// // Get a single house by ID
// router.get('/:id', getHouseById);

// // Create house (with image upload)
// router.post(
//   '/',
//   protect,
//   authorize('landlord', 'admin'),
//   upload.single('image'), // 👈 handles the uploaded file
//   createHouse
// );

// // Add room to a house (landlord only)
// router.post('/:id/rooms', protect, authorize('landlord', 'admin'), async (req, res) => {
//   try {
//     const house = await House.findById(req.params.id);
//     if (!house) return res.status(404).json({ message: 'House not found' });

//     if (house.landlord.toString() !== req.user._id.toString() && req.user.role !== 'admin')
//       return res.status(403).json({ message: 'Not allowed' });

//     house.rooms.push(req.body.room);
//     await house.save();
//     res.status(201).json(house);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const { createHouse, getHouses, getHouseById, getMyHouses } = require('../controllers/houseController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get('/', getHouses);
router.get('/my-houses', protect, authorize('landlord'), getMyHouses);
router.get('/:id', getHouseById);
router.post('/', protect, authorize('landlord', 'admin'), upload.single('image'), createHouse);

module.exports = router;
