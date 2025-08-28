import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopKList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTopK();
  }, []);

  const fetchTopK = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/topk?k=5'); // fetch top 5
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Top-K Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopKList;
