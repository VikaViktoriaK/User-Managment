import React from 'react';
import './UserCard.css';
import { Link, useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const firstName = user?.firstName ?? 'No name';
  const lastName = user?.lastName ?? '';
  const image = user?.image ?? 'No photo';
  const job = user?.company?.title ?? 'No job info';
  const city = user?.address?.city ?? 'No city info';
  const id = user?.id;

  return (
    <div className="user-card">
      <img src={image} alt={firstName} className="user-img" />
      <div className="user-info">
        <h3>
          {firstName} {lastName}
        </h3>
        <p className="user-job">{job}</p>
        <p className="user-city">{city}</p>
        <Link
          to={`/users/${id}`}
          className="user-card-button"
          style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
