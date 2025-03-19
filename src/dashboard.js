// Dashboard.js
import React, { useState } from 'react';

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]); // State to store passwords
  const [website, setWebsite] = useState(''); // State for website/service name
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = async () => {
    // Add your logout functionality here
    setUser(null);
  };

  const handleSavePassword = () => {
    // Save password to the list
    const newPassword = { website, username, password };
    setPasswords([...passwords, newPassword]);

    // Clear input fields after saving
    setWebsite('');
    setUsername('');
    setPassword('');
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    }).catch((error) => {
      alert('Failed to copy text: ', error);
    });
  };

  return (
    <div>
      <h2>Welcome to XecureVault, {user.email}!</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Your Saved Passwords:</h3>
      {passwords.length === 0 ? (
        <p>No passwords saved yet.</p>
      ) : (
        <ul>
          {passwords.map((item, index) => (
            <li key={index}>
              <strong>{item.website}:</strong>
              <br />
              <strong>Username:</strong> {item.username} 
              <button onClick={() => copyToClipboard(item.username)}>Copy</button>
              <br />
              <strong>Password:</strong> {item.password}
              <button onClick={() => copyToClipboard(item.password)}>Copy</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Add New Password:</h3>
      <input
        type="text"
        placeholder="Website Name"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleSavePassword}>Save Password</button>
    </div>
  );
}

export default Dashboard;
