import React, { useState } from 'react';
import { db } from './firebase'; // Import firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Import firestore methods

function AddPasswordForm({ user }) {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const newPassword = {
      service,   // Website name
      username,  // Username
      password,  // Password
      email: user.email,  // Authenticated user email
    };

    try {
      // Save password to Firestore under "passwords" collection
      await addDoc(collection(db, 'passwords'), newPassword);
      setService('');
      setUsername('');
      setPassword('');
      setError('');
      alert('Password saved successfully!');
    } catch (err) {
      setError('Error saving password: ' + err.message);
      console.error('Error saving password: ', err);
    }
  };

  return (
    <div>
      <h3>Add New Password</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Password</button>
      </form>
    </div>
  );
}

export default AddPasswordForm;
