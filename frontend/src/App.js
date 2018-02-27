import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SideBar from "./Components/SideBar/SideBar";
import Home from './Components/Home'
import OrganisationCard from './Components/Organisation'
import AddOrganisationForm from './Components/Organisation/AddOrganisationForm'

import "./App.css";

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div className="content">
        <SideBar />
        <main className="main-contents">
          <Home />
          <Route path="/healthcare" component={OrganisationCard} />
          <Route path="/addorganisationForm" component={AddOrganisationForm} />
        </main>
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
