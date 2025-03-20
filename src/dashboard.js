// Dashboard.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';  // Import Firestore db
import { getDocs, collection, addDoc } from "firebase/firestore";

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]);  // State to store passwords
  const [website, setWebsite] = useState('');  // State for website/service name
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = async () => {
    setUser(null);  // Handle your logout logic (e.g., using Firebase Authentication)
  };

  // Fetch passwords from Firestore when the component mounts
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const passwordsCollection = collection(db, "passwords");  // Collection to store passwords
        const passwordSnapshot = await getDocs(passwordsCollection);
        const passwordList = passwordSnapshot.docs.map(doc => doc.data());
        setPasswords(passwordList);  // Set the passwords in state
      } catch (error) {
        console.error("Error fetching passwords: ", error);
      }
    };

    fetchPasswords();
  }, []);

  const handleSavePassword = async () => {
    try {
      const newPassword = { website, username, password };
      // Save the new password to Firestore
      await addDoc(collection(db, "passwords"), newPassword);
      setPasswords([...passwords, newPassword]);  // Update local state

      // Clear input fields after saving
      setWebsite('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error("Error saving password: ", error);
    }
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
