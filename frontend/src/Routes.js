import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideBar from "./Components/SideBar/SideBar";
import OrganisationCard from './Components/Organisation'
import AddOrganisationForm from './Components/Organisation/AddOrganisationForm';
import Users from './Components/Users';
import AddUser from './Components/Users/AddUser';
import UsersListb from './Components/Users/UsersListTable';

const Routes = () => (
  <Router>
    <div className="content">
      <SideBar />
      <main className="main-contents">
        <Route exact path="/services/healthcare" component={OrganisationCard} />
        <Route exact path="/organisations/add" component={AddOrganisationForm} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users" component={UsersListb} />
        <Route exact path="/users/add" component={AddUser} />
      </main>
    </div>
  </Router>
);

export default Routes;
