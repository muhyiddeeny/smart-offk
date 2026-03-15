import { useEffect, useState } from 'react';
import API from '../api/api';

export default function MyHouses() {
  const [houses, setHouses] = useState([]);
  const serverURL = API.defaults.baseURL.replace('/api', '');

  useEffect(() => {
    API.get('/houses/my-houses').then(res => setHouses(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">My Property Dashboard</h2>
      </div>
      
      {houses.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500">You haven't listed any houses yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {houses.map(house => (
            <div key={house._id} className="flex flex-col sm:flex-row bg-white p-5 rounded-2xl shadow-sm border items-center">
              <img src={house.image ? `${serverURL}${house.image}` : `${serverURL}/uploads/default.jpg`} className="w-32 h-24 rounded-lg object-cover mb-4 sm:mb-0 sm:mr-6" alt="" />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-lg text-gray-900">{house.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{house.address}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                    {house.approved ? (
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">Approved</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-bold">Pending Review</span>
                    )}
                    <span className="text-xs text-gray-400">{house.rooms?.length} total rooms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
