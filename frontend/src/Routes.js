import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import SideBar from './Components/SideBar';

import OrganisationCard from './Components/Organisation';
import AddOrganisation from './Components/Organisation/AddOrganisation';
import LandingPage from './Components/LandingPage';
import Users from './Components/Users';

const Routes = props => {
  const showSideBar = props.location.pathname !== '/';
  return (
    <div className="content">
      {showSideBar ? <SideBar /> : null}
      <Route exact path="/" component={LandingPage} />
      <main className="main-contents">
        <Route exact path="/services/healthcare" component={OrganisationCard} />
        <Route exact path="/organisations/add" component={AddOrganisation} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:form" component={Users} />
      </main>
    </div>
  );
};

export default withRouter(props => <Routes {...props} />);
