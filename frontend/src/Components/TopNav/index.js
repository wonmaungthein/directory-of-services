import React from 'react';
import { Link } from 'react-router-dom';
import './top-nav.css';

import helpers from '../../helpers';

const TopNav = ({ service }) => (
  <div>
    <div className="main-nav">
      <div>
        <span>{helpers.capitaliseAndPrettify(service)}</span>
        <Link to="/organisations/add" className="add-orgnaization">
          <span className="add-orgonaization-button">Add new</span>
        </Link>
      </div>
      <div className="login-section">
        <h4>
          Loggedin as <strong>Carmela</strong>
        </h4>
      </div>
    </div>
  </div>
);

export default TopNav;
