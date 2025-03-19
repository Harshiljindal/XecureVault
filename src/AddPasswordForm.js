// AddPasswordForm.js
import React, { useState } from 'react';

function AddPasswordForm() {
  const [service, setService] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPassword = { service, username, password };
    // Save to localStorage (you can replace this with a database later)
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    storedPasswords.push(newPassword);
    localStorage.setItem('passwords', JSON.stringify(storedPasswords));

    // Clear form fields
    setService('');
    setUsername('');
    setPassword('');
    alert('Password added successfully!');
  };

  return (
    <div>
      <h3>Add New Password</h3>
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
