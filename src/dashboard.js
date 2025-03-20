import React, { useState, useEffect } from 'react';
import { fetchPasswords, savePassword, deletePassword } from './firestoreService';
import { auth } from './firebase';
import * as XLSX from "xlsx";
import './Dashboard.css';

function Dashboard({ user, setUser }) {
  const [passwords, setPasswords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      }, 5 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

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

  const handleSavePassword = async () => {
    if (!user || !website || !username || !password) return;
    await savePassword(user.uid, website, username, password);
    fetchPasswords(user.uid).then(setPasswords);
    setWebsite("");
    setUsername("");
    setPassword("");
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

  const handleExport = () => {
    if (passwords.length === 0) return alert("No passwords to export!");
    const ws = XLSX.utils.json_to_sheet(passwords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Passwords");
    XLSX.writeFile(wb, "XecureVault_Backup.xlsx");
  };

  const filteredPasswords = passwords.filter((pwd) =>
    pwd.website.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pwd.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container neumorphism">
      <h2 className="welcome-message">Welcome, {user?.email}</h2>
      
      {/* Add Password Section */}
      <div className="password-entry">
        <input type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)} className="input-field" />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        <button onClick={handleSavePassword} className="add-button">Save</button>
      </div>
      
      {/* Search Bar */}
      <input type="text" placeholder="Search by website or username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-bar full-width" />
      
      {/* Stored Passwords Table */}
      <table className="password-table">
        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPasswords.length === 0 ? (
            <tr><td colSpan="4">No matching passwords found.</td></tr>
          ) : (
            filteredPasswords.map((pwd) => (
              <tr key={pwd.id}>
                <td>{pwd.website}</td>
                <td>{pwd.username}</td>
                <td>••••••••</td>
                <td>
                  <button onClick={() => handleCopy(pwd.password)}>Copy</button>
                  <button onClick={() => handleDelete(pwd.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Bottom Section */}
      <div className="bottom-bar">
        <button onClick={handleLogout} className="logout-button full-width">Log Out</button>
        <div className="export-section">
          <button onClick={handleExport} className="export-button">Export Backup</button>
          <input type="file" accept=".xlsx" onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;