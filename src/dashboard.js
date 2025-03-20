import React, { useState, useEffect } from 'react';
import { fetchPasswords, savePassword } from './firestoreService';
import { auth } from './firebase';
import AddPasswordForm from './AddPasswordForm';

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]);

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
    fetchPasswords(user.uid).then(setPasswords);  // Refresh password list
  };

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      
      {/* Add Password Form */}
      <AddPasswordForm onSave={handleSavePassword} />

      <h3>Your Saved Passwords:</h3>
      {passwords.length === 0 ? (
        <p>No passwords saved yet.</p>
      ) : (
        <ul>
          {passwords.map((pwd) => (
            <li key={pwd.id}>
              <strong>{pwd.website}</strong> - {pwd.username} - {pwd.password}
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default Dashboard;
