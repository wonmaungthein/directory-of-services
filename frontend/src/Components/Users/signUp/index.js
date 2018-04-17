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
    nameError: '',
    userName: '',
    userNameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    retypePassword: '',
    retypePassError: '',
    notificationSystem: null,
    error: ''
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

  validateFormHandler = () => {
    let isError = false;
    const errors = {
        nameError: '',
        userNameError: '',
        emailError: '',
        passwordError: '',
        retypePassError: '',
    };

    if (this.state.userName.length < 5) {
      isError = true;
      errors.userNameError = 'Username needs to be at least 5 characters long';
    }

    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Requires valid email';
    }

      this.setState({
        ...this.state,
        ...errors,
      });
    
    return isError;
  };

  handleSubmit = e => {
    e.preventDefault();
    // this.savedChangesSuccessfully();
    const err = this.validateFormHandler();
    if (!err) {
      this.setState({
        fullName: '',
        nameError: '',
        userName: '',
        userNameError: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        retypePassword: '',
        retypePassError: '',
        notificationSystem: null,
      });
    }
    // this.props.history.push('/home');
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    // console.log(this.state.fullName.length)
  };

  render() {
    return (
      <div className="sign-up-page">
        <NotificationSystem ref="savedChanges" />
        <Paper className="form-card">
          <h2> Create account </h2>
          <Grid container spacing={24}>
            <Grid item xs>
              <SignUpFields
                fullName={this.state.fullName}
                username={this.state.userName}
                email={this.state.email}
                password={this.state.password}
                retypePassword={this.state.retypePassword}
                nameError={this.state.nameError}
                userNameError={this.state.userNameError}
                emailError={this.state.emailError}
                passwordError={this.state.passwordError}
                retypePassError={this.state.retypePassError}
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
