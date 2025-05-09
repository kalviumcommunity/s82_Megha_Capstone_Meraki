import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('Unauthorized!');

      try {
        const response = await axios.get('http://localhost:5000/api/auth/dashboard', {
          headers: { Authorization: token },
        });
        setUser(response.data.user);
      } catch (err) {
        alert('Failed to load dashboard!');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Welcome, {user.name}!</p> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;
