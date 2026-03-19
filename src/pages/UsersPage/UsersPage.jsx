import React, { useEffect, useState, useMemo } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import { useGetUsersQuery } from '../../services/usersApi';
import './UsersPage.css';
import Menu from '../../components/Menu/Menu';
import Filter from '../../components/Filter/Filter';
import Search from '../../components/Search/Search';
import { Container } from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';

const UsersPage = () => {
  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const usersCards = 6;

  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    if (selectedDepartment) {
      filtered = filtered.filter((user) => user.company?.department === selectedDepartment);
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

    return filtered;
  }, [users, selectedDepartment, selectedGender, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartment, selectedGender, search]);

  // Расчет пагинации
  const indexOfLastUser = currentPage * usersCards;
  const indexOfFirstUser = indexOfLastUser - usersCards;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersCards);

  const departments = ['Engineering', 'Support', 'Human Resources', 'Marketing', 'Legal', 'Sales'];
  const genders = ['Male', 'Female'];

  return (
    <>
      <Menu />
      <Container>
        <div className="filters-block">
          <Search search={search} setSearch={setSearch} />
          <div className="filters">
            <Filter options={departments} label="Department" onChange={setSelectedDepartment} />
            <Filter options={genders} label="Gender" onChange={setSelectedGender} />
          </div>
        </div>

        <div className="user-list">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <div>Error: {error?.message || 'Failed to load users'}</div>
          ) : filteredUsers.length === 0 ? (
            <p className="no-users">No users found</p>
          ) : (
            currentUsers.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>

        {filteredUsers.length > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </>
  );
};

export default UsersPage;
