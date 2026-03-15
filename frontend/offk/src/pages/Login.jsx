
// // frontend/src/pages/Login.jsx
// import { useState } from "react";
// import API, { setAuthToken } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [form, setForm] = useState({ identifier: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await API.post("/users/login", form);
//       const { token, user } = res.data;

//       // 1. Save to Storage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
      
//       // 2. Update API headers & Global Context
//       setAuthToken(token);
//       login(token);

//       // 3. Role-based Redirection
//       if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (user.role === "landlord") {
//         navigate("/add-house");
//       } else {
//         navigate("/houses");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
//       <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
//         <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back</h3>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Identifier</label>
//           <input
//             className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//             placeholder="Reg No (Students) or Email (Landlords)"
//             value={form.identifier}
//             onChange={(e) => setForm({ ...form, identifier: e.target.value })}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input
//             className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//             placeholder="••••••••"
//             type="password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             required
//           />
//         </div>

//         <button 
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition disabled:opacity-70 shadow-md"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <button 
//             type="button"
//             onClick={() => navigate("/register")}
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Register here
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// }

// frontend/src/pages/Login.jsx
import { useState } from "react";
import API, { setAuthToken } from "../api/api";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setAuthToken(token);
      login(token);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "landlord") {
        navigate("/add-house");
      } else {
        navigate("/houses");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 px-4">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Welcome Back</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Identifier</label>
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Reg No (Students) or Email (Landlords)"
            value={form.identifier}
            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
            required
          />
        </div>

        <div className="mb-2"> {/* Reduced margin bottom */}
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="••••••••"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* ✅ ADDED: Forgot Password Link */}
        <div className="flex justify-end mb-6">
          <Link 
            to="/forgot-password" 
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 w-full rounded-lg transition disabled:opacity-70 shadow-md"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
}
