
// frontend/offk/src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Houses from "./pages/Houses";
import House from "./pages/House";
import AddHouse from "./pages/AddHouse";
import MyHouses from "./pages/MyHouses"; // ✅ Fixed: Added MyHouses import
import BookRoom from "./pages/BookRoom";
import StudentDashboard from "./pages/StudentDashboard";
import PaymentCallback from "./pages/PaymentCallback";
import AdminDashboard from "./pages/admin/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Context & Protection
import { AuthProvider } from "./context/AuthContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"; // ✅ Fixed: Added Protection

// Components
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              {/* Student/User Routes */}
              <Route path="/houses" element={<Houses />} />
              <Route path="/houses/:id" element={<House />} />
              <Route path="/book/:houseId/:roomId" element={<BookRoom />} />
              <Route path="/student" element={<StudentDashboard />} />

              {/* Landlord Routes */}
              <Route path="/add-house" element={<AddHouse />} />
              <Route path="/my-houses" element={<MyHouses />} /> {/* ✅ Fixed: Added MyHouses route */}

              {/* Payment */}
              <Route path="/payment-callback" element={<PaymentCallback />} />

              {/* Admin Route (Secured) */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } 
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
