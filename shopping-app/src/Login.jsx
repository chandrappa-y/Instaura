import React, { useState } from 'react';
import { fetchLogin } from './services';
import errors from './errors.js';
import loginIcon from './images/loginIcon.png'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginForm, setLoginForm] = useState(false);

  const performLogin = () => {
    if (!username) {
      setError(errors['username_required']);
      setUsername('');
      return;
    }
    setError('');
    setIsLoading(true);
    fetchLogin(username)
      .then((response) => {
        setError('');
        onLogin(response);
      })
      .catch((err) => {
        setError(errors[err.code || 'DEFAULT']);
        setIsLoading(false);
        setUsername('');
      });
  };

  const viewLoginForm = () => {
    setLoginForm(true);
  }

  return (
    <div className="login">
      <span className="errors">{error}</span>
      {!loginForm ? <button className="login-button" onClick={viewLoginForm}><img src={loginIcon} alt="" width="45px" height="45px" />
        <span className="tip-text">Login</span>
      </button> :
        <div>
          <input className="input-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name" />
          {
            isLoading ?
              "Loading... " :
              <button onClick={performLogin}>submit</button>
          }
        </div>
      }
    </div>
  );
};

export default Login;