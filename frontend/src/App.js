import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from './Components/SideBar/SideBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider> 
          <div className="content">
            <SideBar />  
            <main className="main-contents">
              <h1>Content Contents</h1>
            </main>
          </div>
          </MuiThemeProvider>
        </Router>  
    );
  }
}

export default App;
