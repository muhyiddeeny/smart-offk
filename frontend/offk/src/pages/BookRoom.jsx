

// src/pages/BookRoom.jsx
import { useEffect, useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function BookRoom() {
  const { houseId, roomId } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await API.get(`/houses/${houseId}`);
        setHouse(res.data);
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    };
    fetchHouse();
  }, [houseId]);

  const reserveAndPay = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      nav("/login");
      return;
    }

    setAuthToken(token);
    setLoading(true);

    try {
      // Step 1: Reserve the room
      const reserveRes = await API.post("/bookings/reserve", {
        houseId,
        roomId,
        // reserveMinutes: 30,
        reserveMinutes: 24 * 60  // 24 hours = 1440 minutes

      });

      const booking = reserveRes.data.booking;

      // Step 2: Initialize Paystack payment
      const user = JSON.parse(localStorage.getItem("user"));
      const payRes = await API.post("/payments/paystack/init", {
        amount: booking.amount,
        email: user?.email || "test@example.com",
        bookingId: booking._id,
      });

      const authorizationUrl = payRes.data?.data?.authorization_url;

      if (authorizationUrl) {
        // ✅ Redirect to Paystack payment page
        window.location.href = authorizationUrl;
      } else {
        alert("Failed to initialize payment.");
      }
    } catch (err) {
      console.error("Error during reservation/payment:", err);
      alert(err.response?.data?.message || "An error occurred while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!house) return <div className="text-center mt-10">Loading house...</div>;
  const room = house.rooms.find((r) => r._id === roomId);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{house.title}</h2>
      <p className="text-gray-600 mb-4">{room?.title || room?.roomNumber}</p>
      <p className="text-lg font-semibold mb-2">Price: ₦{room?.price}</p>
      <p className="text-sm mb-4">
        Available: {room?.available ? "Yes" : "No"}
      </p>
      <button
        onClick={reserveAndPay}
        disabled={loading || !room?.available}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Reserve & Pay"}
      </button>
    </div>
  );
}
