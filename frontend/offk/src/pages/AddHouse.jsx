// // frontend/pages/AddHouse.jsx
// import { useState } from 'react';
// import API, { setAuthToken } from '../api/api';

// export default function AddHouse() {
//   const [form, setForm] = useState({
//     title: '',
//     address: '',
//     description: '',
//   });

//   // completely empty fields
//   const [rooms, setRooms] = useState([{ roomNumber: '', title: '', price: '' }]);
//   const [image, setImage] = useState(null);

//   const addRoomField = () => {
//     setRooms([...rooms, { roomNumber: '', title: '', price: '' }]);
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       setAuthToken(token);

//       const formData = new FormData();
//       formData.append('title', form.title);
//       formData.append('address', form.address);
//       formData.append('description', form.description);
//       formData.append('rooms', JSON.stringify(rooms));
//       if (image) formData.append('image', image);

//       await API.post('/houses', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       alert(' House created successfully!');
//       setForm({ title: '', address: '', description: '' });
//       setRooms([{ roomNumber: '', title: '', price: '' }]);
//       setImage(null);
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error creating house');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">Add New House</h2>

//       <form onSubmit={submit} className="space-y-4">
//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Enter house title (e.g., Luxury Apartment, Mini Flat)"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />

//         <input
//           className="border p-2 w-full rounded"
//           placeholder="Enter full address (e.g., No. 12 GRA Road, Gombe)"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//           required
//         />

//         <textarea
//           className="border p-2 w-full rounded"
//           placeholder="Enter a short description (e.g., Spacious 2-bedroom apartment with steady water & light)"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />

//         <div>
//           <label className="block font-medium mb-1">Upload House Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <div>
//           <h4 className="font-semibold mb-2">Rooms</h4>
//           {rooms.map((r, i) => (
//             <div key={i} className="grid grid-cols-3 gap-2 mb-2">
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Enter room number (e.g., 101)"
//                 value={r.roomNumber}
//                 onChange={(e) => {
//                   const newRooms = [...rooms];
//                   newRooms[i].roomNumber = e.target.value;
//                   setRooms(newRooms);
//                 }}
//               />
//               <input
//                 className="border p-2 rounded"
//                 placeholder="Enter room type (e.g., Single Room, Self Contain)"
//                 value={r.title}
//                 onChange={(e) => {
//                   const newRooms = [...rooms];
//                   newRooms[i].title = e.target.value;
//                   setRooms(newRooms);
//                 }}
//               />
//               <input
//                 className="border p-2 rounded"
//                 type="number"
//                 placeholder="Enter price per month (₦)"
//                 value={r.price}
//                 onChange={(e) => {
//                   const newRooms = [...rooms];
//                   newRooms[i].price = e.target.value;
//                   setRooms(newRooms);
//                 }}
//               />
//             </div>
//           ))}

//           <button
//             type="button"
//             onClick={addRoomField}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             ➕ Add another room
//           </button>
//         </div>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
//         >
//           Create House
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setAuthToken } from '../api/api';

export default function AddHouse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', address: '', description: '' });
  const [rooms, setRooms] = useState([{ roomNumber: '', title: '', price: '' }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addRoomField = () => setRooms([...rooms, { roomNumber: '', title: '', price: '' }]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      setAuthToken(token);

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('address', form.address);
      formData.append('description', form.description);
      formData.append('rooms', JSON.stringify(rooms));
      if (image) formData.append('image', image);

      await API.post('/houses', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      alert('Property submitted successfully! Admin will review it.');
      navigate('/my-houses');
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating house');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">List Your Property</h2>
      <form onSubmit={submit} className="space-y-5">
        <input className="border p-3 w-full rounded-lg" placeholder="Property Title (e.g. Blue Sky Lodge)" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input className="border p-3 w-full rounded-lg" placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
        <textarea className="border p-3 w-full rounded-lg h-24" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        
        <div className="bg-gray-50 p-4 rounded-xl">
            <label className="block font-bold mb-2">House Image</label>
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full" />
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <h4 className="font-bold mb-3">Room Configuration</h4>
          {rooms.map((r, i) => (
            <div key={i} className="flex space-x-2 mb-3">
              <input className="border p-2 rounded w-1/3" placeholder="No." value={r.roomNumber} onChange={e => { const n = [...rooms]; n[i].roomNumber = e.target.value; setRooms(n); }} required />
              <input className="border p-2 rounded w-1/3" placeholder="Type" value={r.title} onChange={e => { const n = [...rooms]; n[i].title = e.target.value; setRooms(n); }} required />
              <input className="border p-2 rounded w-1/3" type="number" placeholder="Price (₦)" value={r.price} onChange={e => { const n = [...rooms]; n[i].price = e.target.value; setRooms(n); }} required />
            </div>
          ))}
          <button type="button" onClick={addRoomField} className="text-blue-600 text-sm font-bold underline">+ Add Another Room</button>
        </div>

        <button disabled={loading} className="bg-blue-600 text-white font-bold p-4 w-full rounded-xl hover:bg-blue-700 transition">
          {loading ? "Uploading Property..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}
