import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../services/usersApi';
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

  const fullName = `${user?.firstName ?? 'No'} ${user?.lastName ?? 'Name'}`;
  const image = user?.image ?? 'https://via.placeholder.com/150';

  const address = user?.address
    ? `${user.address?.address ?? 'N/A'}, ${user.address?.city ?? 'N/A'}, ${user.address?.country ?? 'N/A'}`
    : 'No address info';

  const companyAddress = user?.company?.address
    ? `${user.company.address?.address ?? 'N/A'}, ${user.company.address?.city ?? 'N/A'}`
    : 'No company address';

  return (
    <div className="user-detail">
      <div className="card">
        <div>
          <button className="back-button" onClick={() => navigate('/users')}>
            &lt; Back to Users
          </button>
        </div>

        <img className="user-image" src={image} alt={fullName} />

        <h2 className="user-name">{fullName}</h2>

        <div className="user-info">
          <p>
            <span className="label">Age:</span> {user?.age ?? 'N/A'}
          </p>
          <p>
            <span className="label">Email:</span> {user?.email ?? 'N/A'}
          </p>
          <p>
            <span className="label">Phone:</span> {user?.phone ?? 'N/A'}
          </p>
          <p>
            <span className="label">Address:</span> {address}
          </p>
          <p>
            <span className="label">University:</span> {user?.university ?? 'N/A'}
          </p>
        </div>

        <h3 className="section-title">Company</h3>
        <div className="company-info">
          <p>
            <span className="label">Company:</span> {user?.company?.name ?? 'N/A'}
          </p>
          <p>
            <span className="label">Position:</span> {user?.company?.title ?? 'N/A'}
          </p>
          <p>
            <span className="label">Address:</span> {companyAddress}
          </p>
        </div>

        <h3 className="section-title">Bank</h3>
        <div className="bank-info">
          <p>
            <span className="label">Card Type:</span> {user?.bank?.cardType ?? 'N/A'}
          </p>
          <p>
            <span className="label">Expire:</span> {user?.bank?.cardExpire ?? 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
