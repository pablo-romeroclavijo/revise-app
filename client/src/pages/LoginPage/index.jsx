// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
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
    console.log("ok3")
    const data = await response.json();
   
    if (response.status == 200) {
        console.log("ur logged in");
        localStorage.setItem("token", data.token)
        navigate("/timetable")
    } else {
        console.log("ur not logged in");
        alert(data.error);
        navigate("/timetable")
        
    }
  };

  const handleSignUp = () => {
    navigate("/signup")
  }

  return (
    <div className='login-container'>
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
      <a onClick={handleSignUp}>Don't have account click here</a>
    </div>
  );
}

export default LoginPage;