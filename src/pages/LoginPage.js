// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // perform auth logic here
    setIsLoggedIn(true); // ✅ set login state
    navigate('/'); // redirect to dashboard
  };

  return (
    <div>
      <h2>Login to FocusMate</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
