import React, { useState, useEffect } from 'react';
import { fetchPasswords, savePassword, deletePassword } from './firestoreService';
import { auth } from './firebase';
import AddPasswordForm from './AddPasswordForm';

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]);
  const [copyMessage, setCopyMessage] = useState(""); // State for copy feedback

  useEffect(() => {
    if (user) {
      fetchPasswords(user.uid).then(setPasswords);
    }
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  const handleSavePassword = async (website, username, password) => {
    if (!user) return;
    await savePassword(user.uid, website, username, password);
    fetchPasswords(user.uid).then(setPasswords);
  };

  const handleDelete = async (passwordId) => {
    await deletePassword(passwordId);
    setPasswords(passwords.filter((pwd) => pwd.id !== passwordId));
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password); // Copy to clipboard
    setCopyMessage("Password copied!"); // Show feedback
    setTimeout(() => setCopyMessage(""), 2000); // Hide message after 2 sec
  };

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <AddPasswordForm onSave={handleSavePassword} />

      <h3>Your Saved Passwords:</h3>
      {copyMessage && <p style={{ color: "green" }}>{copyMessage}</p>} {/* Show copy message */}
      
      {passwords.length === 0 ? (
        <p>No passwords saved yet.</p>
      ) : (
        <ul>
          {passwords.map((pwd) => (
            <li key={pwd.id}>
              <strong>{pwd.website}</strong> - {pwd.username} - {pwd.password}
              <button onClick={() => handleCopy(pwd.password)} style={{ marginLeft: "10px" }}>
                Copy
              </button>
              <button onClick={() => handleDelete(pwd.id)} style={{ marginLeft: "10px", color: "red" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;
