import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/volunteers')
      .then(res => { setVolunteers(res.data.volunteers); setLoading(false); })
      .catch(() => { setError('Failed to fetch volunteers'); setLoading(false); });
  }, []);

  if (loading) return <div>Loading volunteers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {volunteers.map(v => <li key={v._id}>{v.name} - {v.email}</li>)}
    </ul>
  );
};

export default VolunteerList;
