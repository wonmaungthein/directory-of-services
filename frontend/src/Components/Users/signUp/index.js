import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import SignUpFields from './SignUpFields';
import SocialSigning from './SocialSigning';

import './signUp.css';

class SignUpForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    retypePassword: '',
    notificationSystem: null,
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges,
    });
  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  };

  failedSavedChanges = () => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'We could not save your changes',
      level: 'error',
    });
  };

  handleSubmit = e => {
    this.savedChangesSuccessfully();
    e.preventDefault();
    this.setState({
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    });
    this.props.history.push('/home');
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="sign-up-page">
        <NotificationSystem ref="savedChanges" />
        <Paper className="form-card">
          <h2> Create an account </h2>
          <Grid container spacing={24}>
            <Grid item xs>
              <SignUpFields
                fullName={this.state.fullName}
                email={this.state.email}
                password={this.state.password}
                retypePassword={this.state.retypePassword}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                savedChangesSuccessfully={this.savedChangesSuccessfully}
              />
            </Grid>
            <Grid item xs>
              <div>
                <div className="form-option">
                  <span className="or">OR</span>
                </div>
                <div className="form-group">
                  <SocialSigning social="Facebook" />
                  <SocialSigning social="Google+" />
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SignUpForm;
