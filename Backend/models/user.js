// // // // // backend/models/user.js

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   regNumber: { type: String, unique: true, sparse: true },
//   email: { type: String, unique: true, sparse: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["student", "landlord", "admin"], default: "student" },
//   // Reset Token Fields
//   resetPasswordToken: String,
//   resetPasswordExpires: Date
// }, { timestamps: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNumber: { 
    type: String, 
    unique: true, 
    sparse: true,
    // Enforces: 2 digits / digits + U,D,T / digits
    match: [/^\d{2}\/\d+[UDT]\/\d+$/, 'Format must be YY/NUMBER[U,D,T]/FACULTY (e.g. 20/45671U/5)']
  },
  email: { type: String, unique: true, sparse: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "landlord", "admin"], default: "student" },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
