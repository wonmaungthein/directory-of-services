import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Categories from '../../Data/Categories.json';

import './top-nav.css';
import helpers from '../../helpers';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    background: '#1abcd4',
  },
});

const TopNav = props => {
  const { classes, addLink, titleLink, title } = props;

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={24} className="top-nav-content">
          <Grid item xs={8}>
            <Typography
              className="add-new-button"
              variant="title"
              color="inherit"
              noWrap
            >
              <Link to={`/${titleLink}`}>
                {helpers.addSpace(Categories, title)}
              </Link>
              <Link to={`/${addLink}`} className="add-orgnaization">
                <Button
                  className="add-orgonaization-button"
                  variant="fab"
                  aria-label="add"
                >
                  <AddIcon />
                </Button>
              </Link>
            </Typography>
          </Grid>
          <Grid className="login-section" item xs={4}>
            <Button className="logo-button" variant="title" color="primary">
              <i className="material-icons">person</i>
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopNav);
