// AddPasswordForm.js
import React, { useState } from 'react';

function AddPasswordForm({ onSave }) {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) {
      alert("Please fill all fields");
      return;
    }
    onSave(website, username, password);
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h3>Add New Password</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Website Name"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
        <button type="submit">Save Password</button>
      </form>
    </div>
  );
}

export default AddPasswordForm;
