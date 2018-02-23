import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SideBar from "./Components/SideBar/SideBar";
import Home from './Components/Home'

import "./App.css";

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div className="content">
        <SideBar />
        <main className="main-contents">
          <Home />
        </main>
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
