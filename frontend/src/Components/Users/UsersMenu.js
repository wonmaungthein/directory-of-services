import React from 'react';
import { Link } from 'react-router-dom';
import './users.css';

const UsersMenu = () => (
  <div className="users-menu">
    <Link to="/users" role="button" className="menu-header">
      Users
    </Link>
    <Link to="/users/add" role="button">
      Add
    </Link>
  </div>
);

export default UsersMenu;
