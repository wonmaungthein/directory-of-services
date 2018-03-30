import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

const LandingPage = () => {
  const showLoggedOut = false;
  return (
    <div className="landing-page">
      <div>
        <h1>Refugees Info</h1>
        <div className="content">
          {showLoggedOut ? <h3>You are logged out</h3> : null}
          <div className="google-sign">
            <div className="google-logo">
              <img src="/google-logo.png" alt="google-logo" />
            </div>
            <div className="google-title">
              <h5>
                <Link to="/services/healthcare">Sign in</Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

