//Backend/seeds/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/user");

dotenv.config();

async function createAdmin() {
  try {
    await connectDB();

    const adminName = "SmartOffK Admin";
    const adminEmail = "smartoffk@gmail.com";
    const adminPassword = "Smart********"; // ← your real password

    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log("⚠️ Admin already exists. Updating password...");
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      existing.password = hashedPassword;
      existing.role = "admin";
      await existing.save();
      console.log("✅ Admin password and role updated successfully!");
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Admin created successfully!");
    }

    console.log("\n--- ADMIN LOGIN DETAILS ---");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("---------------------------\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();

