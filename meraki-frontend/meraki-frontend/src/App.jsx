import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemperatureForm from './components/TemperatureForm';
import TemperatureList from './components/TemperatureList';

const App = () => {
  const [temperatures, setTemperatures] = useState([]);

  // Fetch all temperatures on component mount
  useEffect(() => {
    fetchTemperatures();
  }, []);

  const fetchTemperatures = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/temperature');
      setTemperatures(res.data);
    } catch (err) {
      console.error('Error fetching temperatures:', err);
    }
  };

  // Add new temperature to the list
  const handleAdded = (newTemp) => {
    setTemperatures([newTemp, ...temperatures]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Meraki Temperature Tracker</h1>
      <TemperatureForm onAdded={handleAdded} />
      <TemperatureList temperatures={temperatures} />
    </div>
  );
};

export default App;
