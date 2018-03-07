import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

const LandingPage = () => (
  <div className="landing-page">
    <div>
      <h1>LOGO</h1>
      <div className="content">
        <h3>You are logged out</h3>
        <Link to="/organisations/add">
          <div className="google-sign">
            <div className="google-logo">
              <img src="/google-logo.png" alt="google-logo" />
            </div>
            <div className="google-title">
              <h5>Sign in with google</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
