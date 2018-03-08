import React from 'react';
import { Link } from 'react-router-dom';

import AddUser from './AddUser';
import UsersListb from './UsersListTable';
import './users.css';

const UsersPage = props => {
  const { params } = props.match;
  const showAddUsersForm = params && params.form === 'add';

  return (
    <div className="users">
      <div className="main-nav">
        <div>
          <Link to="/users">USERS</Link>
          <Link to="/users/add" className="add-user-title">
            <span className="add-new-user-button">Add new</span>
          </Link>
        </div>
        <div className="login-section">
          <h4>
            Loggedin as <strong>Carmela</strong>
          </h4>
        </div>
      </div>
      {showAddUsersForm ? <AddUser /> : null}
      <UsersListb />
    </div>
  );
};

export default UsersPage;
