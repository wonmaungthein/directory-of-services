import React, { Fragment } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import './user-drop-down.css';
import './users.css';

const UserDropDown = ({ handleLogOut, role }) => (
  <div className="user-drop-down">
    <Paper className="container">
      <Link to="/user/profile">
        <i className="material-icons">perm_contact_calendar</i>
        <h4>Profile</h4>
      </Link>
      <Divider />
      <Divider />
      {role === 'Admin' &&
        <Fragment>
          <Link to="/admindos">
            <img src="https://png.icons8.com/material/24/1abcd4/businessman.png" alt="admin-icon" />
            <h4 className="admin">Users</h4>
          </Link>
        </Fragment>
      }
      {role === 'Admin'  &&
        <Fragment>
          <Divider />
          <Link to="/accept">
            <img src="https://png.icons8.com/material/24/1abcd4/businessman.png" alt="admin-icon" />
            <h4 className="admin">Review Request</h4>
          </Link>
          <Divider />
        </Fragment>
      }
      <Link to="/">
        <button
          onClick={handleLogOut}
        >
          <i className="material-icons">lock_outline</i>
          <h4 >Logout</h4>
        </button>
      </Link>
    </Paper>
  </div>
  )

export default UserDropDown;