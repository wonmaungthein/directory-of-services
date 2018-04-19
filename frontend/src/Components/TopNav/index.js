import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import { connect } from 'react-redux';
import { logout } from '../../actions/loginActions'
import Categories from '../../Data/Categories.json';
import './top-nav.css';
import helpers from '../../helpers';
import UserDropDown from '../Users/UserDropDown';

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

class TopNav extends Component {
  state = {
    userDropDown: false,
  };

  handleLogOut = (e) => {
    e.preventDefault();
    this.context.router.history.push('/')
    this.props.logout();
  }

  showUserDropDown = () => {
    this.setState({
      userDropDown: !this.state.userDropDown,
    });
  };

  renderUserDropDown = () =>
    this.state.userDropDown ? <UserDropDown handleLogOut={this.handleLogOut} /> : null;

  render(){
    const { classes, addLink, titleLink, title, addOrg, user } = this.props;
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={24} className="top-nav-content">
            <Grid item xs={8}>
              <Typography
                className="add-new-button add-organisation-title"
                variant="title"
                color="inherit"
                noWrap
              >
                {addOrg}  
                <Link to={`/${titleLink}`}>
                  {helpers.addSpace(Categories, title)}
                </Link>
                {addOrg ? null :
                  (
                    <Link to={`/${addLink}`} className="add-orgnaization">
                      <Button
                        className="add-orgonaization-button"
                        variant="fab"
                        aria-label="add"
                      >
                        <AddIcon />
                      </Button>
                    </Link>
                  )
                }
              </Typography>
            </Grid>
            <Grid className="login-section" item xs={4}>
              <Typography
                variant="title"
                color="inherit"
                noWrap
              >
                Welcome {user}
              </Typography>
              <Button
                onClick={this.showUserDropDown}
                className="logo-button"
                variant="title"
                color="primary"
              >
                <i className="material-icons">person</i>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        {this.renderUserDropDown()}
      </AppBar>
    );
  }
}

TopNav.contextTypes = {
  router: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
    user: state.loginAuth.user.username
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, { logout })(TopNav));
