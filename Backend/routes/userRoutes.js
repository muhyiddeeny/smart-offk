// // // // backend/routes/userRoutes.js
// // 
// const express = require("express");
// const router = express.Router();
// const { register, login, profile, forgotPassword, resetPassword } = require("../controllers/userController");
// const { protect } = require("../middleware/auth");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.get("/profile", protect, profile);

// module.exports = router;

const express = require("express");
const router = express.Router();
// ✅ Ensure all these 5 functions exist in the controller file
const { register, login, forgotPassword, resetPassword, profile } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/profile", protect, profile);

module.exports = router;
