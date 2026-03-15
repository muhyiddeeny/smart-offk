// //src/pages/Houses.jsx
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import API from '../api/api';

// export default function Houses() {
//   const [houses, setHouses] = useState([]);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       try {
//         const res = await API.get('/houses');
//         setHouses(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchHouses();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">Available Houses</h2>
//       {houses.length === 0 ? (
//         <p className="text-center text-gray-500">No houses available yet.</p>
//       ) : (
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {houses.map((house) => (
//             <Link
//               key={house._id}
//               to={`/houses/${house._id}`} // ✅ Go to the house details page
//               className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block"
//             >
//               {/* ✅ Show image */}
//               <img
//                 src={`http://localhost:5000${house.images?.[0] || '/uploads/default.jpg'}`}
//                 alt={house.title}
//                 className="h-48 w-full object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-semibold text-lg">{house.title}</h3>
//                 <p className="text-gray-600">{house.address}</p>
//                 <p className="text-sm text-gray-500 mt-1 line-clamp-2">{house.description}</p>
//                 <div className="mt-3">
//                   <span className="text-blue-600 font-bold">
//                     {house.rooms?.length || 0} Room(s)
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function Houses() {
  const [houses, setHouses] = useState([]);
  const serverURL = API.defaults.baseURL.replace('/api', '');

  useEffect(() => {
    API.get('/houses').then(res => setHouses(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">Explore Available Housing</h2>
      {houses.length === 0 ? (
        <p className="text-center text-gray-500">No approved houses available at the moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {houses.map((house) => (
            <Link key={house._id} to={`/houses/${house._id}`} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
              <img 
                src={house.image ? `${serverURL}${house.image}` : `${serverURL}/uploads/default.jpg`} 
                className="h-52 w-full object-cover" 
                alt={house.title} 
              />
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-800">{house.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{house.address}</p>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-blue-600 font-bold">{house.rooms?.length || 0} Room(s)</span>
                  <span className="text-green-600 font-semibold text-sm">Verified</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
