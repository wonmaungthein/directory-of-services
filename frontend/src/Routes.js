import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import OrganisationCard from './Components/Organisation';
import AddOrganisation from './Components/Organisation/AddOrganisation';
import LandingPage from './Components/LandingPage';
import SideBar from './Components/SideBar';
import Users from './Components/Users';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
  },
});

const Routes = props => {
  const { classes } = props;
  const showSideBar = props.location.pathname !== '/';
  return (
    <div className={classes.root} >
      {showSideBar ? <SideBar /> : null}
      <Route exact path="/" component={LandingPage} />
      <main className={classes.content}>
        <div className={classes.drawerHeader} /> 
        <Route exact path="/services/:service" component={OrganisationCard} />
        <Route exact path="/:service/add" component={AddOrganisation} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:form" component={Users} />
      </main>
    </div>
  );
};

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(props => <Routes {...props} />));
