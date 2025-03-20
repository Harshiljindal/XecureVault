// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import LoginPage from "./login";
import SignupPage from "./signup";
import Dashboard from "./dashboard";
import AddPasswordForm from "./AddPasswordForm";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignupPage setUser={setUser} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        <Route path="/add-password" element={user ? <AddPasswordForm /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
