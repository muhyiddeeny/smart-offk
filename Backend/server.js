
// // backend/server.js
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const connectDB = require("./config/db");
// const User = require("./models/user");

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "10mb" }));
// app.use(cookieParser());

// // Static folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/houses", require("./routes/houseRoutes"));
// app.use("/api/bookings", require("./routes/bookingRoutes"));
// app.use("/api/payments", require("./routes/paymentRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));

// // Default route
// app.get("/", (req, res) => res.send("SmartOffK Backend Running ✅"));

// // Function to create default admin
// async function createDefaultAdmin() {
//   try {
//     const adminEmail = "smartoffk@gmail.com";
//     const existingAdmin = await User.findOne({ email: adminEmail });

//     if (!existingAdmin) {
//       await User.create({
//         name: "SmartOffK Admin",
//         email: adminEmail,
//         password: "Smart********", // change this before production
//         role: "admin",
//       });
//       console.log("✅ Default admin created successfully!");
//     } else {
//       console.log("🟢 Admin already exists.");
//     }
//   } catch (error) {
//     console.error("❌ Error creating admin:", error.message);
//   }
// }

// // Start server only after DB connects
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
//   createDefaultAdmin(); // now runs after MongoDB is ready
// });

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");
const User = require("./models/user");

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/houses", require("./routes/houseRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => res.send("SmartOffK Backend Running ✅"));

// 🛠️ AUTOMATIC DATABASE REPAIR FUNCTION
async function repairDatabase() {
  try {
    console.log("🛠️  Checking database indexes...");
    // 1. Delete any users that have an empty string "" instead of a real email
    await User.deleteMany({ email: "" });
    await User.deleteMany({ regNumber: "" });

    // 2. Drop the old conflicting email index
    try {
      await User.collection.dropIndex("email_1");
      console.log("✅ Old email index cleared.");
    } catch (e) {
      // Index might not exist yet, that's fine
    }

    // 3. Create a default admin if none exists
    const adminEmail = "smartoffk@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: "SmartOffK Admin",
        email: adminEmail,
        password: "SmartPassword123",
        role: "admin",
      });
      console.log("✅ Default admin created.");
    } else {
      console.log("🟢 Admin ready.");
    }
  } catch (error) {
    console.error("❌ DB Repair Error:", error.message);
  }
}

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    repairDatabase(); // Fixes the index issue every time you start
  });
});
