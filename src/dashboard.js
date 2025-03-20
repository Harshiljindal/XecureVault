import React, { useState, useEffect } from 'react';
import { fetchPasswords, savePassword, deletePassword } from './firestoreService';
import { auth } from './firebase';
import AddPasswordForm from './AddPasswordForm';

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchPasswords(user.uid).then(setPasswords);
    }

    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        alert("You have been logged out due to inactivity.");
        handleLogout();
      }, 5 * 60 * 1000); // 5 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer(); // Start timer

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(inactivityTimer);
    };
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
    navigator.clipboard.writeText(password);
    setCopyMessage("Password copied!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const filteredPasswords = passwords.filter((pwd) =>
    pwd.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <AddPasswordForm onSave={handleSavePassword} />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by website or username..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "80%" }}
      />

      <h3>Your Saved Passwords:</h3>
      {copyMessage && <p style={{ color: "green" }}>{copyMessage}</p>}

      {filteredPasswords.length === 0 ? (
        <p>No matching passwords found.</p>
      ) : (
        <ul>
          {filteredPasswords.map((pwd) => (
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
