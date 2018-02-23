import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from "react-router-dom";
import './home.css'

const Home = () =>(
  <div>
    <div className="main-nav">
      <div className="orgonaization-title">
        <span>HEALTHCARE</span>
        <Link to="/addOrgonaization" className="add-orgnaization"><span className="add-orgonaization-button">Add new</span><ContentAdd className="button-icon" /></Link>
      </div>
      <div className="login-section">
        <h4>Loggedin as <strong>Carmela</strong></h4>
      </div>
    </div>
  </div>
);


export default Home;