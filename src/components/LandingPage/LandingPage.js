import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetch('https://panorbit.in/api/users.json')
      .then((response) => response.json())
      .then((data) => 
      setUserAccounts(data.users))
      .catch((error) => console.log(error));
  }, []);

  const handleUserAccountClick = (userId) => {
    setSelectedUserId(userId);
  };

  const renderUserAccounts = () => {
    return userAccounts.map((user) => (
      <div key={user.id} className="user-account">
        <Link
          to={`/profile/${user.id}`}
          className="user-account-link"
          onClick={() => handleUserAccountClick(user.id)}
        >
          {user.profilepicture && (
            <img src={user.profilepicture} alt={user.name} className="user-account-image" />
          )}
          <span>{user.name}</span>
        </Link>
      </div>
    ));
  };

  const renderProfileDetails = () => {
    if (selectedUserId) {
      return (
        <div className="profile-details">
          <h2>Profile Details</h2>
          <p>Selected User ID: {selectedUserId}</p>
          {/* Render additional profile details */}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="heading">Select an Account</h1>
        <div className="user-accounts">{renderUserAccounts()}</div>
        {renderProfileDetails()}
      </div>
    </div>
  );
};

export default LandingPage;
