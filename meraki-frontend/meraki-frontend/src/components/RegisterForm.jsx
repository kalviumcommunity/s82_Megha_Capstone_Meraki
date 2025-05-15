import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Unified input handler with trimming
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  // Enhanced form submission with better error handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are mandatory. Please fill them.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('Submitting your registration...');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Registration completed successfully!');
      setFormData({ name: '', email: '', password: '', role: 'volunteer' });
    } catch (err) {
      setSuccess('');
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-background">
      <div className="w-full max-w-md p-6 bg-soft-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">User Registration</h2>
        {error && <div className="p-2 mb-4 text-red-600 bg-red-100 rounded">{error}</div>}
        {success && <div className="p-2 mb-4 text-green-600 bg-green-100 rounded">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-1">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
            >
              <option value="volunteer">Volunteer</option>
              <option value="ngo">NGO</option>
              <option value="voter">Voter</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-accent-dark rounded hover:bg-primary-dark transition"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
