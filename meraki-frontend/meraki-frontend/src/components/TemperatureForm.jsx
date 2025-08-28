import React, { useState } from 'react';
import axios from 'axios';

const TemperatureForm = ({ onAdded }) => {
  const [location, setLocation] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/temperature', { location, value });
      setLocation('');
      setValue('');
      onAdded(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        required 
      />
      <input 
        type="number" 
        placeholder="Temperature (°C)" 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        required 
      />
      <button type="submit">Add Temperature</button>
    </form>
  );
};

export default TemperatureForm;
