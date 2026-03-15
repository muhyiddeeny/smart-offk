
// backend/controllers/adminController.js
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Stats (existing)
exports.getStats = async (req, res) => {
  try {
    const landlords = await User.countDocuments({ role: "landlord" });
    const students = await User.countDocuments({ role: "student" });
    const houses = require("../models/house").countDocuments();
    const pendingHouses = await require("../models/house").countDocuments({ approved: false });

    res.json({ landlords, students, houses: await houses, pendingHouses });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// Get pending houses (you already have, keep as-is if exists)
exports.getPendingHouses = async (req, res) => {
  try {
    const houses = await require("../models/house").find({ approved: false }).populate("landlord", "name email");
    res.json(houses);
  } catch (error) {
    console.error("Error fetching pending houses:", error);
    res.status(500).json({ message: "Error fetching pending houses" });
  }
};

// Approve house (keep if exists)
exports.approveHouse = async (req, res) => {
  try {
    const house = await require("../models/house").findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
    if (!house) return res.status(404).json({ message: "House not found" });
    res.json({ message: "House approved successfully", house });
  } catch (error) {
    console.error("Error approving house:", error);
    res.status(500).json({ message: "Error approving house" });
  }
};

// -----------------------------
// Student management (new)
// -----------------------------

// GET /api/admin/students
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password").sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error("Error get students", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
};

// POST /api/admin/students  (create student with default password "password")
exports.createStudent = async (req, res) => {
  try {
    const { regNumber, name, department, level } = req.body;
    if (!regNumber || !name) return res.status(400).json({ message: "regNumber and name are required" });

    const exists = await User.findOne({ regNumber });
    if (exists) return res.status(400).json({ message: "Student with this regNumber already exists" });

    const newStudent = await User.create({
      regNumber,
      name,
      department: department || "",
      level: level || "",
      role: "student",
      password: "password", // will be hashed by model
    });

    res.status(201).json({ message: "Student created", student: { _id: newStudent._id, regNumber, name, department, level } });
  } catch (err) {
    console.error("Create student error", err);
    res.status(500).json({ message: "Failed to create student" });
  }
};

// PUT /api/admin/students/:id  (update student)
exports.updateStudent = async (req, res) => {
  try {
    const { name, department, level } = req.body;
    const student = await User.findById(req.params.id);
    if (!student || student.role !== "student") return res.status(404).json({ message: "Student not found" });

    student.name = name ?? student.name;
    student.department = department ?? student.department;
    student.level = level ?? student.level;
    await student.save();

    res.json({ message: "Student updated", student: { _id: student._id, regNumber: student.regNumber, name: student.name, department: student.department, level: student.level } });
  } catch (err) {
    console.error("Update student error", err);
    res.status(500).json({ message: "Failed to update student" });
  }
};

// DELETE /api/admin/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student || student.role !== "student") return res.status(404).json({ message: "Student not found" });

    await student.remove();
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error("Delete student error", err);
    res.status(500).json({ message: "Failed to delete student" });
  }
};


