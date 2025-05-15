import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'volunteer', // Default role
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all the required fields.');
      return;
    }

    setError('');
    setSuccess('');

    // Simulate API call
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Registration successful! You can now log in.');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'volunteer',
        });
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-background">
      <div className="w-full max-w-md p-6 bg-soft-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">Register</h2>
        {error && <div className="p-2 mb-4 text-red-600 bg-red-100 rounded">{error}</div>}
        {success && <div className="p-2 mb-4 text-green-600 bg-green-100 rounded">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-dark mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-dark mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-dark mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent-dark"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-primary-dark mb-2" htmlFor="role">
              Role
            </label>
            <select
              id="role"
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
