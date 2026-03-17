import React from 'react';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.image} alt={user.firstName} className="user-img" />
      <div className="user-info">
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p className="user-job">{user.company ? user.company.title : 'No job info'}</p>
        <p className="user-city">{user.address ? user.address.city : 'No city info'}</p>
        <button className="user-card-button">View Details</button>
      </div>
    </div>
  );
};

export default UserCard;
