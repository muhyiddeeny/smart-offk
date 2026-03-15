// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await api.get("/houses");
        setHouses(res.data.slice(0, 3)); // show only top 3 featured houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };
    fetchHouses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          className="relative z-10 text-white px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find Your Perfect Off-Campus Home
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Verified landlords • Easy booking • Secure payments
          </p>
          <div className="space-x-4">
            <Link
              to="/houses"
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-semibold shadow-md"
            >
              Browse Houses
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">1. Search Houses</h3>
            <p className="text-gray-600">
              Browse verified off-campus rooms and apartments near your school.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">2. Book Instantly</h3>
            <p className="text-gray-600">
              Reserve your preferred room securely with just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">3. Move In</h3>
            <p className="text-gray-600">
              Contact the landlord, confirm your stay, and move in stress-free!
            </p>
          </div>
        </div>
      </section>

      {/* Featured Houses Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Featured Houses
        </h2>

        {houses.length === 0 ? (
          <p className="text-center text-gray-500">No houses available yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {houses.map((house) => (
              <motion.div
                key={house._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={
                    house.image ||
                    "https://images.unsplash.com/photo-1560448075-bb485b03a4e7?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={house.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{house.title}</h3>
                  <p className="text-gray-600 mb-3 truncate">{house.description}</p>
                  <p className="font-bold text-blue-600 mb-4">
                    ₦{house.price?.toLocaleString()}
                  </p>
                  <Link
                    to={`/houses/${house._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


