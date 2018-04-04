import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import './user-drop-down.css';


import './users.css';

const UserDropDown = () => (
  <div className="user-drop-down">
    <Paper className="container">
      <Link to="/users">
        <i className="material-icons">perm_contact_calendar</i>
        <h4>Profile</h4>
      </Link>
      <Divider />  
      <Link to="/">
        <i className="material-icons">lock_outline</i>
        <h4>Logout</h4>
      </Link>
    </Paper>  
  </div>
);

export default UserDropDown;