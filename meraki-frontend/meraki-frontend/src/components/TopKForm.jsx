import React, { useState } from 'react';
import axios from 'axios';

const TopKForm = ({ onAdded }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/topk', { name, value });
      setName('');
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
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Value/Score"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <button type="submit">Add Top-K Item</button>
    </form>
  );
};

export default TopKForm;
