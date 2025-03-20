import React, { useState } from "react";
import zxcvbn from "zxcvbn";

function AddPasswordForm({ onSave }) {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  // Function to check password strength
  const checkStrength = (pass) => {
    const result = zxcvbn(pass);
    setStrength(result.score); // Strength score (0 to 4)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!website || !username || !password) {
      alert("Please fill all fields");
      return;
    }
    onSave(website, username, password);
    setWebsite("");
    setUsername("");
    setPassword("");
    setStrength(0);
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
          onChange={(e) => {
            setPassword(e.target.value);
            checkStrength(e.target.value);
          }}
          required
        />
        <br />

        {/* Password Strength Indicator */}
        <div style={{ margin: "5px 0" }}>
          <strong>Password Strength: </strong>
          <span
            style={{
              color:
                strength === 0
                  ? "red"
                  : strength === 1
                  ? "orange"
                  : strength === 2
                  ? "yellow"
                  : strength === 3
                  ? "blue"
                  : "green",
            }}
          >
            {["Weak", "Fair", "Good", "Strong", "Very Strong"][strength]}
          </span>
        </div>

        <button type="submit">Save Password</button>
      </form>
    </div>
  );
}

export default AddPasswordForm;
