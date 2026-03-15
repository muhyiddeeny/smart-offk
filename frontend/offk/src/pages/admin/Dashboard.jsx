// frontend/src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🛡️ Ensure only admins can access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("Access denied. Admins only.");
      navigate("/login");
    }
  }, [navigate]);

  // 📊 Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, housesRes] = await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/houses"),
        ]);
        setStats(statsRes.data);
        setHouses(housesRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Approve house
  const approveHouse = async (id) => {
    try {
      await API.put(`/admin/houses/${id}/approve`);
      setHouses(houses.filter((h) => h._id !== id));
      alert("House approved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to approve house.");
    }
  };

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">SmartOffK Admin</h2>

        <nav className="flex flex-col space-y-3">

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-left hover:text-blue-200"
          >
             Dashboard
          </button>

          {/* NEW — Manage Students */}
          <button
            onClick={() => navigate("/admin/students")}
            className="text-left hover:text-blue-200"
          >
             Manage Students
          </button>

          <button
            onClick={() => alert("User management coming soon!")}
            className="text-left hover:text-blue-200"
          >
             Manage Users
          </button>

          <button
            onClick={() => alert("Bookings management coming soon!")}
            className="text-left hover:text-blue-200"
          >
             Manage Bookings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* Stats */}
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Users</h3>
              <p>Landlords: {stats.landlords}</p>
              <p>Students: {stats.students}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Houses</h3>
              <p>Total: {stats.houses}</p>
              <p>Pending: {stats.pendingHouses}</p>
            </div>
          </div>
        ) : (
          <p>No stats available yet.</p>
        )}

        {/* Pending houses */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Pending Houses</h2>
          {houses.length === 0 ? (
            <p>No pending houses right now.</p>
          ) : (
            <ul>
              {houses.map((house) => (
                <li
                  key={house._id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h3 className="font-semibold">{house.title}</h3>
                    <p className="text-gray-600 text-sm">{house.address}</p>
                  </div>
                  <button
                    onClick={() => approveHouse(house._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

