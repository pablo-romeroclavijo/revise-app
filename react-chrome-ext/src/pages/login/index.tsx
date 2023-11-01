// src/components/Login.js
import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import { redirect, useNavigate } from 'react-router-dom';



function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

    useEffect(()=>{},[error])

  const handleLogin = async () => {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }


    const response = await fetch("https://revise-app.onrender.com/user/login", options);
    const data = await response.json();
    if (response.status == 200) {
        console.log("ur logged in");
        localStorage.setItem("token", data.token)
        setError('Logged in')
    } else {
        console.log("ur not logged in");
        setError(data.error);
        
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </div>
  );
}

export default LoginPage;