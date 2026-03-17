import React, { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/usersSlice';
import './UsersPage.css';
import Menu from '../../components/Menu/Menu';
import Filter from '../../components/Filter/Filter';
import Search from '../../components/Search/Search';
import { Container } from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const usersCards = 6;

  const indexOfLastUser = currentPage * usersCards;
  const IndexOfFirstUser = indexOfLastUser - usersCards;
  const currentUsers = filteredUsers.slice(IndexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersCards);

  const { users, status, error } = useSelector((state) => state.users);

  const departments = ['Engineering', 'Support', 'Human Resources', 'Marketing', 'Legal', 'Sales'];
  const genders = ['Male', 'Female'];

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  useEffect(() => {
    if (!users || users.length === 0) return;

    let filtered = [...users];

    if (selectedDepartment) {
      filtered = filtered.filter(
        (user) => user.company && user.company.department === selectedDepartment,
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(
        (user) => user.gender.toLowerCase() === selectedGender.toLowerCase(),
      );
    }

    if (search) {
      filtered = filtered.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredUsers(filtered);
  }, [selectedDepartment, selectedGender, users, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, selectedGender, search]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Menu />
      <Container>
        <div className="filters">
          <Search search={search} setSearch={setSearch} />
          <Filter options={departments} label="Department" onChange={handleDepartmentChange} />
          <Filter options={genders} label="Gender" onChange={handleGenderChange} />
        </div>
        <div className="user-list">
          {filteredUsers.length === 0 ? (
            <p className="no-users">No users found</p>
          ) : (
            currentUsers.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Container>
    </>
  );
};

export default UsersPage;
