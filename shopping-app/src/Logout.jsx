import React from 'react';
import { fetchLogout } from './services';

const Logout = ({ user, logoutUser }) => {
  const logout = () => {
    fetchLogout()
      .then(() => logoutUser());
  };
  return (
    <div className="logout">
      {
        user.isLoggedIn &&
        <button onClick={logout}>Logout</button>
      }
    </div>
  );
};

export default Logout;