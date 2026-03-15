// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// Protect all admin routes
router.use(protect, authorize("admin"));

// stats / houses (you had these)
router.get("/stats", adminController.getStats);
router.get("/houses", adminController.getPendingHouses);
router.put("/houses/:id/approve", adminController.approveHouse);

// student management
router.get("/students", adminController.getStudents);
router.post("/students", adminController.createStudent);
router.put("/students/:id", adminController.updateStudent);
router.delete("/students/:id", adminController.deleteStudent);

module.exports = router;

