// src/pages/House.jsx
import { useEffect, useState } from 'react';
import API from '../api/api';
import { useParams, Link } from 'react-router-dom';

export default function House(){
  const { id } = useParams();
  const [house,setHouse]=useState(null);
  useEffect(()=>{ API.get(`/houses/${id}`).then(r=>setHouse(r.data)).catch(()=>{}); }, [id]);

  if(!house) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="text-2xl font-bold">{house.title}</h2>
      <p className="text-sm text-gray-600">{house.address}</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {house.rooms.map(room => (
          <div key={room._id} className="p-4 border rounded">
            <h4 className="font-semibold">{room.roomNumber} — {room.title}</h4>
            <p className="mt-1">Price: {room.price}</p>
            <p className="mt-2">Available: {room.available ? 'Yes' : 'No'}</p>
            {room.available && <Link to={`/book/${house._id}/${room._id}`} className="mt-2 inline-block text-white bg-blue-600 px-3 py-1 rounded">Book</Link>}
          </div>
        ))}
      </div>
    </div>
  );
}


