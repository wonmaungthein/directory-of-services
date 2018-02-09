import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider> 
        <div className="content">
          <h1 className="side-bar">SideBar Component</h1>  
          <main className="main-contents">
            <h1>Content Contents</h1>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
