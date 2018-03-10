import React from 'react';
import TopNav from '../TopNav';
import AddUser from './AddUser';
import UsersListTable from './UsersListTable';
import './users.css';

const UsersPage = props => {
  const { params } = props.match;
  const showAddUsersForm = params && params.form === 'add';
  return (
    <div className="users">
      <TopNav title="USERS" addLink="users/add" titleLink="users" />
      {showAddUsersForm ? <AddUser /> : null}
      <UsersListTable />
    </div>
  );
};

export default UsersPage;