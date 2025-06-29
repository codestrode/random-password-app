import React, { useState } from 'react';

function App() {
  const [passwordType, setPasswordType] = useState('a');
  const [digits, setDigits] = useState(12);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    fetch(`http://127.0.0.1:8000/generate-password?password_type=${passwordType}&digits=${digits}`)
      .then((res) => res.json())
      .then((data) => setPassword(data.password))
      .catch(() => setPassword('Error generating password'));
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Password Generator</h2>

      <label>
        Password Type:
        <select value={passwordType} onChange={(e) => setPasswordType(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="n">Numbers Only</option>
          <option value="l">Letters Only</option>
          <option value="a">Numbers + Letters + Special</option>
        </select>
      </label>

      <br /><br />

      <label>
        Digits:
        <input
          type="number"
          min="4"
          max="128"
          value={digits}
          onChange={(e) => setDigits(Number(e.target.value))}
          style={{ marginLeft: 8, width: 60 }}
        />
      </label>

      <br /><br />

      <button onClick={generatePassword} style={{ padding: '0.5rem 1rem' }}>
        Generate Password
      </button>

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        {password && `Generated Password: ${password}`}
      </p>
    </div>
  );
}

export default App;