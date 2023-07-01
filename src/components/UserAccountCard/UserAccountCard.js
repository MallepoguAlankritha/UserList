import React from 'react';
import { Link } from 'react-router-dom';

const UserAccountCard = ({ user }) => {
  return (
    <Link to={`/profile/${user.id}`} className="user-account-card">
      <img src={user.profilepicture} alt={user.username} />
      <h3>{user.username}</h3>
    </Link>
  );
};

export default UserAccountCard;
