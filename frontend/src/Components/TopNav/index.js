import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
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
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const TopNav = (props) => {
  const { classes, title, addLink, titleLink } = props;
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerToggle}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Grid container spacing={24}>
          <Grid item xs={8}>
            <Typography className="add-new-button" variant="title" color="inherit" noWrap>
              <Link to={`/${titleLink}`}>{helpers.capitaliseAndPrettify(title)}</Link>
              <Link to={`/${addLink}`} className="add-orgnaization">
                <span className="add-orgonaization-button">Add new</span>
              </Link>
            </Typography>
          </Grid>
          <Grid className="login-section" item xs={4}>
            <Typography variant="title" color="inherit" noWrap>
              Loggedin as <strong>Carmela</strong>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
};

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(TopNav);