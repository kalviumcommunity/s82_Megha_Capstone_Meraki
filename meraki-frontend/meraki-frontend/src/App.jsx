import React, { useState } from 'react';
import TemperatureForm from './components/TemperatureForm';
import TemperatureList from './components/TemperatureList';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => {
    setRefresh(!refresh); // trigger refresh
  };

  return (
    <div>
      <h1>Meraki Temperature Tracker</h1>
      <TemperatureForm onAdded={handleAdded} />
      <TemperatureList key={refresh} />
    </div>
  );
};

export default App;
