// //frontend/offk/src/pages/ForgotPassword.jsx
// import { useState } from "react";
// import API from "../api/api";
// import { Link } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     try {
//       const res = await API.post("/users/forgot-password", { email });
//       setMessage(res.data.message || "Password reset link sent to your email.");
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to send reset email.");
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
//           Forgot Password
//         </h3>

//         <p className="text-gray-500 text-center mb-4">
//           Enter your registered email and we’ll send you a password reset link.
//         </p>

//         <input
//           type="email"
//           className="border p-3 mb-4 w-full rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition disabled:opacity-60"
//         >
//           {loading ? "Sending..." : "Send Reset Link"}
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
import API from "../api/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    
    try {
      // ✅ Hits the router.post("/forgot-password", forgotPassword)
      const res = await API.post("/users/forgot-password", { identifier });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100"
      >
        <h3 className="text-2xl font-bold mb-2 text-center text-blue-600">Recover Account</h3>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Enter your Reg No or Email to receive a password reset link.
        </p>

        <div className="mb-4">
          <input 
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            placeholder="Reg No or Email" 
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required 
          />
        </div>

        <button 
          disabled={loading} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 w-full rounded-lg transition shadow-md disabled:opacity-50"
        >
          {loading ? "Sending..." : "Request Reset Link"}
        </button>

        {message && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
            {error}
          </div>
        )}
        
        <div className="text-center mt-6">
          <Link to="/login" className="text-sm text-blue-600 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
