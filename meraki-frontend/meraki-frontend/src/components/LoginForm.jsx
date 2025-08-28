import React, { useState } from 'react';

// Meraki theme colors
const colors = {
  primaryDark: '#0D7377',      // Teal - main color
  accentWarm: '#FF6F61',       // Warm Coral - accents & buttons
  softWhite: '#FAF9F6',        // Soft white background
  mutedGray: '#B0BEC5',        // Muted Gray - placeholders & borders
  errorRed: '#B00020'          // For validation errors
};

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer'); // default role
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    // TODO: Call your login API here and handle response
    // onLogin({ email, password, role });

    console.log('Logging in with:', { email, password, role });
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: colors.softWhite,
      borderRadius: 8,
      boxShadow: `0 2px 8px ${colors.mutedGray}`
    }}>
      <h2 style={{ color: colors.primaryDark, textAlign: 'center', marginBottom: '1.5rem' }}>
        Meraki Login
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Role Selector */}
        <label style={{ color: colors.primaryDark, fontWeight: 'bold' }}>
          Select Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              margin: '0.5rem 0 1rem 0',
              borderRadius: 4,
              border: `1px solid ${colors.mutedGray}`,
              fontSize: '1rem'
            }}
          >
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
            <option value="voter">Voter</option>
          </select>
        </label>

        {/* Email Input */}
        <label style={{ color: colors.primaryDark, fontWeight: 'bold' }}>
          Email:
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              margin: '0.5rem 0 1rem 0',
              borderRadius: 4,
              border: `1px solid ${colors.mutedGray}`,
              fontSize: '1rem'
            }}
          />
        </label>

        {/* Password Input */}
        <label style={{ color: colors.primaryDark, fontWeight: 'bold' }}>
          Password:
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              margin: '0.5rem 0 1rem 0',
              borderRadius: 4,
              border: `1px solid ${colors.mutedGray}`,
              fontSize: '1rem'
            }}
          />
        </label>

        {/* Error Message */}
        {error && (
          <div style={{ color: colors.errorRed, marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: colors.accentWarm,
            color: colors.softWhite,
            fontWeight: 'bold',
            fontSize: '1.1rem',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#e65b54'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = colors.accentWarm}
        >
          Log In
        </button>
      </form>
    </div>
  );
}
