import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SideBar from "./Components/SideBar/SideBar";

import "./App.css";

const App = () => (
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

export default App;
