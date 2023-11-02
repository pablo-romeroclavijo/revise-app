// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email:email,
            password: password
        })
    }


    const response = await fetch("https://revise-app.onrender.com/user/register", options);
    const data = await response.json();
    if (response.status == 200) {
        console.log("ur signed up");
        navigate("/")
    } else {
        console.log("ur not signed up");
        alert(data.error);
        navigate("/signup")
        
    }
  };

  const handleLogin = () => {
    navigate("/")
  }

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      <input
        type="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <a onClick={handleLogin}>Already have an account login here</a>
    </div>
  );
}

export default SignUpPage;