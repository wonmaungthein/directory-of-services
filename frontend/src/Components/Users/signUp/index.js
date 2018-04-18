import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PasswordValidator from 'password-validator';
import SignUpFields from './SignUpFields';
// import SocialSigning from './SocialSigning';

import './signUp.css';

const numbLetters = new PasswordValidator();
numbLetters
  .is()
  .min(7) // Minimum length 7
  .is()   // Maximum length 100
  .max(100);

const letterTransform = new PasswordValidator(); 
letterTransform
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase(); // Must have lowercase letters

const hasDigit = new PasswordValidator();
hasDigit 
  .has()
  .hasDigit() // Must have hasDigit
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

class SignUpForm extends Component {
  state = {
    fullName: '',
    userName: '',
    userNameError: '',
    org: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
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
      message: 'We could not create your account',
      level: 'error',
    });
  };

  validateFormHandler = () => {
    let isError = false;
    const errors = {
      userNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    if (this.state.userName.length < 6) {
      isError = true;
      errors.userNameError = 'Username needs to be at least 6 characters long';
    }

    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Requires valid email';
    }

    if (!numbLetters.validate(this.state.password)) {
      isError = true;
      errors.passwordError += 'Your password need at least 7 characters.';
    }

    if (!letterTransform.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include upper & lower case letters.';
    }

    if (!hasDigit.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include a digit & no space.';
    }

    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.confirmPasswordError = ' Your password is not matching.';
    }
    this.setState({
      ...this.state,
      ...errors,
    });

    return isError;
  };

  handleSubmit = e => {
    e.preventDefault();
    const err = this.validateFormHandler();
    this.failedSavedChanges();
    this.setState({
      password: '',
      confirmPassword: '',
    });

    if (!err) {
      this.savedChangesSuccessfully();
      this.setState({
        fullName: '',
        userName: '',
        userNameError: '',
        org: '',
        email: '',
        emailError: '',
        password: '',
        passwordError: '',
        confirmPassword: '',
        confirmPasswordError: '',
      });
      this.props.history.push('/home');
    }
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
          <h2> Create account </h2>
          <Grid container spacing={24}>
            <SignUpFields
              fullName={this.state.fullName}
              username={this.state.userName}
              org={this.state.org}
              email={this.state.email}
              password={this.state.password}
              confirmPassword={this.state.confirmPassword}
              userNameError={this.state.userNameError}
              emailError={this.state.emailError}
              passwordError={this.state.passwordError}
              confirmPasswordError={this.state.confirmPasswordError}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              savedChangesSuccessfully={this.savedChangesSuccessfully}
            />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SignUpForm;
