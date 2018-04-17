import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import PasswordValidator from 'password-validator';
import SignUpFields from './SignUpFields';
import SocialSigning from './SocialSigning';

import './signUp.css';

const numbLetters = new PasswordValidator();
numbLetters
.is().min(8)                                    // Minimum length 8
.is().max(100)  

const capiLetters = new PasswordValidator();    // Maximum length 100
capiLetters
.has().uppercase()                              // Must have uppercase letters
.has().lowercase() 

const digits= new PasswordValidator();
digits                                          // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values



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
      nameError: '',
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
      errors.passwordError += 'Your password need at least 8 characters.';
    }

    if (!capiLetters.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include upper & lower case letters.';
    }

    if (!digits.validate(this.state.password)) {
      isError = true;
      errors.passwordError += ' You must include a digit & no space.';
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
    // console.log(this.state.password)
    // console.log(schema.validate(this.state.password));
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
        confirmPassword: '',
        confirmPasswordError: '',
      });
    this.savedChangesSuccessfully();      
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
            <Grid item xs>
              <SignUpFields
                fullName={this.state.fullName}
                username={this.state.userName}
                email={this.state.email}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                nameError={this.state.nameError}
                userNameError={this.state.userNameError}
                emailError={this.state.emailError}
                passwordError={this.state.passwordError}
                confirmPasswordError={this.state.confirmPasswordError}
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
