import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../services/usersApi'; // Импортируем хук
import './UserDetailPage.css';
import Loader from '../../components/Loader/Loader';

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useGetUserByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="status-message error">Error loading user</p>;
  }

  if (!user) {
    return <p className="status-message">User not found</p>;
  }

  return (
    <div className="user-detail">
      <div className="card">
        <div>
          <button className="back-button" onClick={() => navigate('/users')}>
            &lt; Back to Users
          </button>
        </div>
        <img className="user-image" src={user.image} alt={user.firstName} />

        <h2 className="user-name">
          {user.firstName} {user.lastName}
        </h2>

        <div className="user-info">
          <p>
            <span className="label">Age:</span> {user.age}
          </p>
          <p>
            <span className="label">Email:</span> {user.email}
          </p>
          <p>
            <span className="label">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="label">Address:</span> {user.address?.address}, {user.address?.city},{' '}
            {user.address?.country}
          </p>
          <p>
            <span className="label">University:</span> {user.university}
          </p>
        </div>

        <h3 className="section-title">Company</h3>
        <div className="company-info">
          <p>
            <span className="label">Company:</span> {user.company?.name}
          </p>
          <p>
            <span className="label">Position:</span> {user.company?.title}
          </p>
          <p>
            <span className="label">Address:</span> {user.company?.address?.address},{' '}
            {user.company?.address?.city}
          </p>
        </div>

        <h3 className="section-title">Bank</h3>
        <div className="bank-info">
          <p>
            <span className="label">Card Type:</span> {user.bank?.cardType}
          </p>
          <p>
            <span className="label">Expire:</span> {user.bank?.cardExpire}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
