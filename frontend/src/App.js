import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SideBar from "./Components/SideBar/SideBar";
import OrganisationCard from './Components/Organisation/OrganisationCard'
import AddOrganisation from './Components/Organisation/AddOrganisation'

import "./App.css";

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div className="content">
        <SideBar />
        <main className="main-contents">
          <h1>Content Contents</h1>
          <Route path="/healthcare" component={OrganisationCard} />
          <Route path="/addorganisation" component={AddOrganisation} />
        </main>
      </div>
    </MuiThemeProvider>
  </Router>
);

export default App;
