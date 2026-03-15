
// // // src/pages/Register.jsx

// import { useState } from 'react';
// import API from '../api/api';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const [role, setRole] = useState('student');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [identifier, setIdentifier] = useState('');
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
    
//     // Construct the data to send to the backend
//     const payload = { 
//         name, 
//         password, 
//         role,
//         [role === 'student' ? 'regNumber' : 'email']: identifier 
//     };

//     try {
//       const res = await API.post('/users/register', payload);
      
//       // Save user and token
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
      
//       // Redirect to houses page
//       nav('/houses');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
//       <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
//         <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h3>
        
//         {/* Full Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//           <input 
//             className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
//             placeholder="e.g. Yahya Muhammad" 
//             required
//             onChange={e => setName(e.target.value)} 
//           />
//         </div>

//         {/* Role Selection */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
//           <select 
//             className="border p-2 w-full rounded bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
//             value={role} 
//             onChange={e => { setRole(e.target.value); setIdentifier(''); }}
//           >
//             <option value="student">Student</option>
//             <option value="landlord">Landlord</option>
//           </select>
//         </div>

//         {/* Conditional Identifier (Email or Reg Number) */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             {role === 'student' ? 'Registration Number' : 'Email Address'}
//           </label>
//           {role === 'student' ? (
//             <input 
//               className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
//               placeholder="20/45671U/5" 
//               required
//               value={identifier}
//               onChange={e => setIdentifier(e.target.value)}
//               // 🛡️ NATIVE PATTERN VALIDATION
//               pattern="\d{2}/\d+[UDT]/\d+"
//               title="Format: Year/Number[U,D,T]/Faculty (e.g. 20/45671U/5)"
//             />
//           ) : (
//             <input 
//               className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
//               type="email"
//               placeholder="landlord@example.com" 
//               required
//               value={identifier}
//               onChange={e => setIdentifier(e.target.value)} 
//             />
//           )}
//         </div>

//         {/* Password */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//           <input 
//             className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
//             type="password" 
//             placeholder="••••••••" 
//             required
//             onChange={e => setPassword(e.target.value)} 
//           />
//         </div>

//         <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 w-full rounded-lg font-bold transition shadow-md">
//           Register
//         </button>

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account? <button type="button" onClick={() => nav('/login')} className="text-blue-600 font-bold hover:underline">Login</button>
//         </p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; // Ensure this path is correct

export default function Register() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); 
  const [regData, setRegData] = useState(null); 
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = { 
        name, 
        password, 
        role,
        [role === 'student' ? 'regNumber' : 'email']: identifier 
    };

    try {
      const res = await API.post('/users/register', payload);
      
      // ✅ SUCCESS: Save to local state only. 
      // DO NOT update localStorage or login() here to prevent auto-redirect.
      setRegData(res.data); 
      setIsSuccess(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = () => {
    if (regData) {
      // ✅ NOW we finalize the session
      localStorage.setItem('token', regData.token);
      localStorage.setItem('user', JSON.stringify(regData.user));
      login(regData.token); 
      nav('/houses');
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-green-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h3>
          <p className="text-gray-600 mb-8">
            Welcome, <span className="font-bold text-blue-600">{name}</span>. Your registration was successful.
          </p>
          <button 
            onClick={handleFinalize} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition shadow-lg transform hover:scale-105"
          >
            Start Exploring Houses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={submit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" required onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
          <select className="border p-2 w-full rounded bg-white" value={role} onChange={e => { setRole(e.target.value); setIdentifier(''); }}>
            <option value="student">Student</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{role === 'student' ? 'Reg Number' : 'Email'}</label>
          <input 
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder={role === 'student' ? "20/45671U/5" : "email@example.com"} 
            required value={identifier} onChange={e => setIdentifier(e.target.value)}
            pattern={role === 'student' ? "\\d{2}/\\d+[UDT]/\\d+" : undefined}
            title="Pattern: 20/45671U/5"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none" type="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        <button disabled={loading} className="bg-blue-600 text-white p-3 w-full rounded-lg font-bold">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
