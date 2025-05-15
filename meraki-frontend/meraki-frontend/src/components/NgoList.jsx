import React, { useEffect, useState } from "react";
import axios from "axios";

const NgoList = () => {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("/api/ngos");
        setNgos(response.data.ngos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNgos();
  }, []);

  if (loading) {
    return <p className="text-center text-cobalt-blue">Loading NGOs...</p>;
  }

  if (error) {
    return <p className="text-center text-warm-coral">Error: {error}</p>;
  }

  return (
    <div className="p-4 bg-soft-white rounded-2xl shadow-lg">
      <h2 className="text-teal text-2xl font-bold mb-4">NGO List</h2>
      {ngos.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ngos.map((ngo) => (
            <li
              key={ngo._id}
              className="p-4 border border-muted-gray rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-golden-sunrise text-lg font-semibold">{ngo.name}</h3>
              <p className="text-muted-gray text-sm">{ngo.description}</p>
              <p className="text-sm text-plum mt-2">Location: {ngo.location || "Not specified"}</p>
              <p className="text-sm text-teal mt-1">Contact: {ngo.contactEmail}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted-gray">No NGOs found.</p>
      )}
    </div>
  );
};

export default NgoList;
