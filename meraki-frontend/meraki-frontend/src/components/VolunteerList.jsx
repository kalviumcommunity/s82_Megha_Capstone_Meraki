import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch volunteers from the API
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get('/api/volunteers');
        setVolunteers(response.data.volunteers);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch volunteers. Please try again later.');
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-4">Loading volunteers...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-soft-white text-gray-800">
      <h1 className="text-2xl font-bold text-teal mb-4">Volunteer List</h1>
      {volunteers.length === 0 ? (
        <p className="text-muted-gray">No volunteers available at the moment.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers.map((volunteer) => (
            <li
              key={volunteer._id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-4">
                {volunteer.profileImage ? (
                  <img
                    src={volunteer.profileImage}
                    alt={volunteer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted-gray rounded-full flex justify-center items-center text-white font-semibold">
                    {volunteer.name[0]}
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-lg">{volunteer.name}</h2>
                  <p className="text-sm text-gray-600">{volunteer.email}</p>
                </div>
              </div>
              {volunteer.bio && (
                <p className="text-sm text-gray-700 mt-2">{volunteer.bio}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerList;
