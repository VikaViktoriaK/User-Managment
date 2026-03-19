import React from 'react';
import './UserCard.css';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const firstName = user?.firstName ?? 'No name';
  const lastName = user?.lastName ?? '';
  const image = user?.image ?? 'https://via.placeholder.com/150';
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
        <button className="user-card-button" onClick={() => id && navigate(`/users/${id}`)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default UserCard;
