import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TemperatureList = () => {
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    fetchTemperatures();
  }, []);

  const fetchTemperatures = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/temperature');
      setTemps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Temperature Records</h2>
      <ul>
        {temps.map(temp => (
          <li key={temp._id}>
            {temp.location}: {temp.value}°C at {new Date(temp.recordedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemperatureList;
