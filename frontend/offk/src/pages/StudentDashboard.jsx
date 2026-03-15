// // src/pages/StudentDashboard.jsx
// import { useEffect, useState } from 'react';
// import API, { setAuthToken } from '../api/api';

// export default function StudentDashboard(){
//   const [bookings,setBookings] = useState([]);
//   useEffect(()=>{
//     const token = localStorage.getItem('token');
//     setAuthToken(token);
//     API.get('/bookings/my').then(r=>setBookings(r.data)).catch(()=>{});
//   },[]);
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
//       {bookings.map(b => (
//         <div key={b._id} className="border p-3 mb-2">
//           <p>House: {b.house?.title}</p>
//           <p>Amount: {b.amount}</p>
//           <p>Status: {b.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../api/api';

export default function StudentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        setAuthToken(token);
        const res = await API.get('/bookings/my');
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        // ✅ PROFESSIONAL EMPTY STATE
        <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 p-12 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            You haven't reserved any rooms yet. Start exploring verified houses near your campus.
          </p>
          <Link 
            to="/houses" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg inline-block"
          >
            Find a House
          </Link>
        </div>
      ) : (
        // LIST OF BOOKINGS
        <div className="grid gap-6">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="font-bold text-xl text-blue-600">{b.house?.title || "Unknown House"}</h4>
                <p className="text-gray-500 text-sm">{b.house?.address}</p>
                <div className="mt-2 flex gap-4 text-sm font-medium">
                   <span>Amount: <span className="text-gray-900">₦{b.amount.toLocaleString()}</span></span>
                   <span>Status: <span className={`capitalize ${b.status === 'confirmed' ? 'text-green-600' : 'text-orange-500'}`}>{b.status}</span></span>
                </div>
              </div>
              <Link 
                to={`/houses/${b.house?._id}`}
                className="text-blue-600 hover:underline font-bold text-sm"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
