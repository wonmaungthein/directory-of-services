import React from 'react';
import './landing-page.css';

const LandingPage = () => (
  <div className="landing-page">
    <div>
      <h1>LOGO</h1>

      <div className="content">
        <h3>You are logged out</h3>

        <div className="google-sign">
          <div className="google-logo">
            <img src="/google-logo.png" alt="google-logo" />
          </div>

          <div className="google-title">
            <h5>Sign in with google</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
