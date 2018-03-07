import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import Home from './Components/Home'
import OrganisationCard from './Components/Organisation'
import AddOrganisationForm from './Components/Organisation/AddOrganisationForm'
import LandingPage from './Components/LandingPage'
const Routes = () => (
  <Router>
    <div className="content">
      <SideBar />
      <main className="main-contents">
        <Home />
        <Route path="/" component={LandingPage} />
        <Route path="/services/healthcare" component={OrganisationCard} />
        <Route path="/organisations/add" component={AddOrganisationForm} />
      </main>
    </div>
  </Router>
);

export default Routes;
