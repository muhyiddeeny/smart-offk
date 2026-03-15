// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  // Update user state when token changes
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setOpen(false);
    navigate("/login");
  };

  // Hide Navbar completely for admin dashboard
  if (user?.role === "admin" && window.location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl text-blue-600"
          onClick={() => setOpen(false)}
        >
          SmartOffK
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">

          {/* Visitor */}
          {!user && (
            <>
              <Link to="/" className="hover:text-blue-500">Home</Link>
              <Link to="/houses" className="hover:text-blue-500">Houses</Link>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register</Link>
            </>
          )}

          {/* Student */}
          {user?.role === "student" && (
            <>
              <Link to="/" className="hover:text-blue-500">Home</Link>
              <Link to="/houses" className="hover:text-blue-500">Houses</Link>
              <Link to="/bookings" className="hover:text-blue-500">My Bookings</Link>
              <button onClick={handleLogout} className="hover:text-red-500 font-semibold">
                Logout
              </button>
            </>
          )}

          {/* Landlord */}
          {user?.role === "landlord" && (
            <>
              <Link to="/" className="hover:text-blue-500">Home</Link>
              <Link to="/my-houses" className="hover:text-blue-500">My Houses</Link>
              <Link to="/add-house" className="hover:text-blue-500">Add House</Link>
              <button onClick={handleLogout} className="hover:text-red-500 font-semibold">
                Logout
              </button>
            </>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" className="hover:text-blue-500">Dashboard</Link>
              <Link to="/admin/users" className="hover:text-blue-500">Manage Users</Link>
              <Link to="/admin/bookings" className="hover:text-blue-500">Manage Bookings</Link>
              <button onClick={handleLogout} className="hover:text-red-500 font-semibold">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t text-gray-700 font-medium">

          {/* Visitor */}
          {!user && (
            <>
              <Link onClick={() => setOpen(false)} to="/" className="block px-4 py-3 hover:bg-gray-100">Home</Link>
              <Link onClick={() => setOpen(false)} to="/houses" className="block px-4 py-3 hover:bg-gray-100">Houses</Link>
              <Link onClick={() => setOpen(false)} to="/login" className="block px-4 py-3 hover:bg-gray-100">Login</Link>
              <Link onClick={() => setOpen(false)} to="/register" className="block px-4 py-3 hover:bg-gray-100">Register</Link>
            </>
          )}

          {/* Student */}
          {user?.role === "student" && (
            <>
              <Link onClick={() => setOpen(false)} to="/" className="block px-4 py-3 hover:bg-gray-100">Home</Link>
              <Link onClick={() => setOpen(false)} to="/houses" className="block px-4 py-3 hover:bg-gray-100">Houses</Link>
              <Link onClick={() => setOpen(false)} to="/bookings" className="block px-4 py-3 hover:bg-gray-100">My Bookings</Link>
              <button onClick={handleLogout} className="block px-4 py-3 text-left hover:bg-gray-100 text-red-500">
                Logout
              </button>
            </>
          )}

          {/* Landlord */}
          {user?.role === "landlord" && (
            <>
              <Link onClick={() => setOpen(false)} to="/" className="block px-4 py-3 hover:bg-gray-100">Home</Link>
              <Link onClick={() => setOpen(false)} to="/my-houses" className="block px-4 py-3 hover:bg-gray-100">My Houses</Link>
              <Link onClick={() => setOpen(false)} to="/add-house" className="block px-4 py-3 hover:bg-gray-100">Add House</Link>
              <button onClick={handleLogout} className="block px-4 py-3 text-left hover:bg-gray-100 text-red-500">
                Logout
              </button>
            </>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <>
              <Link onClick={() => setOpen(false)} to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-100">Dashboard</Link>
              <Link onClick={() => setOpen(false)} to="/admin/users" className="block px-4 py-3 hover:bg-gray-100">Manage Users</Link>
              <Link onClick={() => setOpen(false)} to="/admin/bookings" className="block px-4 py-3 hover:bg-gray-100">Manage Bookings</Link>
              <button onClick={handleLogout} className="block px-4 py-3 text-left hover:bg-gray-100 text-red-500">
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
}

