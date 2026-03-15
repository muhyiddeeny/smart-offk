// //frontend/offk/src/pages/ResetPassword.jsx
// import { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import API from "../api/api";

// export default function ResetPassword() {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirm) {
//       setMessage("Passwords do not match.");
//       return;
//     }
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await API.post(`/users/reset-password/${token}`, { password });
//       setMessage(res.data.message || "Password reset successful!");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Reset failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-md w-96 border border-gray-100"
//       >
//         <h3 className="text-2xl mb-5 font-semibold text-center text-blue-600">
//           Reset Password
//         </h3>

//         <input
//           type="password"
//           placeholder="New Password"
//           className="border p-3 mb-3 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           required
//         />

//         <button
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition disabled:opacity-60"
//         >
//           {loading ? "Resetting..." : "Reset Password"}
//         </button>

//         {message && (
//           <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
//         )}

//         <div className="text-center mt-5">
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Back to Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      // ✅ Matches router.post("/reset-password/:token", resetPassword);
      const res = await API.post(`/users/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96 border border-gray-100">
        <h3 className="text-2xl mb-5 font-semibold text-center text-blue-600">New Password</h3>
        <input type="password" placeholder="New Password" required className="border p-3 mb-3 w-full rounded focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-500" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition disabled:opacity-60">
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && <p className={`text-center text-sm mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
      </form>
    </div>
  );
}
