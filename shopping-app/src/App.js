import React, { useState, useEffect } from 'react';
import { fetchLoginStatus } from './services';
import ShoppingPage from './ShoppingPage';
import UserAccount from './UserAccount';
import Logout from './Logout';
import Login from './Login';
import errors from './errors';
import Admin from './Admin';
import accountIcon from './images/myAccountIcon.png';
import logo from './images/logo.png'
import './App.css';

const App = () => {
  const [userState, setUserState] = useState({ isLoggedIn: false });
  const [error, setError] = useState('');
  const [userAccount, setUserAccount] = useState({ display: false });
  const [admin, setAdminState] = useState({ isLoggedIn: false });

  useEffect(() => {
    fetchLoginStatus()
      .then((response) => {
        setUserState({
          isLoggedIn: true,
          username: response.username
        });
        if (response.username.toLowerCase() === 'admin') {
          setAdminState({ isLoggedIn: true });
        }
        setError('');
      });
  }, []);

  const login = (response) => {
    setError('');
    setUserState({
      isLoggedIn: true,
      username: response.username
    });
    if (response.username.toLowerCase() === 'admin') {
      setAdminState({ isLoggedIn: true });
    }
  };

  const logout = () => {
    setUserState({
      isLoggedIn: false,
      username: ''
    });
    setAdminState({
      isLoggedIn: false
    });
    setUserAccount({
      display: false
    });
    setError('');
  };

  const isLoginRequired = () => {
    setError(errors['login_required']);
  }

  const enableUserAccount = () => {
    if (!userState.isLoggedIn) {
      setError(errors['login_required']);
      setUserAccount({
        display: false
      });
    } else {
      setUserAccount({
        display: true
      });
      setError('');
    }
  }

  const closeUserAccount = () => {
    setUserAccount({
      display: false
    });
    setError('');
  }

  const showError = (error) => {
    setError(errors[error.code || 'DEFAULT']);
  }

  return (
    <div className="App">
      <div className="main-page-error">{error}</div>
      {admin.isLoggedIn ? <Logout user={userState} logoutUser={logout} /> : ''}
      {
        admin.isLoggedIn ? <Admin /> :
          <div>
            <div className="page-content">
              {userState.isLoggedIn ? '' : <Login onLogin={login} />}
              <img className="logo" src={logo} alt='logo' width="55px" height="55px"></img>
              <h1>Instaura</h1>
              <div className="account" >
                <button className="account-button" onClick={enableUserAccount}>
                  <img src={accountIcon} alt="My Account" width="55px" height="55px"></img>
                  <span className="tip-text">My Account</span>
                </button>
              </div>
            </div>
            <div>
              {!userAccount.display ? '' : <UserAccount username={userState.username} closeUserAccount={closeUserAccount} />}
            </div>
            <div>
              {!userAccount.display ? <ShoppingPage user={userState} loginRequired={isLoginRequired} onLogout={logout} displayError={showError} /> : ''}
            </div>
          </div>
      }

    </div>
  );
};

export default App;