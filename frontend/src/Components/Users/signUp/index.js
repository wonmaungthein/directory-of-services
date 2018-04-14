import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import SignUpFields from './SignUpFields';
import SocialSigning from './SocialSigning';

import './signUp.css';

class SignUpForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addNewUserHandler();
    this.setState({
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    });
    this.savedChangesSuccessfully();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="sign-up-page">
        <Grid container spacing={24}>
          <Grid item xs>
            <SignUpFields
              fullName={this.state.fullName}
              email={this.state.email}
              password={this.state.password}
              retypePassword={this.state.retypePassword}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </Grid>
          <Grid item xs>
            <div>
              <div className="sep">
                <span className="or">OR</span>
              </div>
              <div className="form-group">
                <SocialSigning social="Facebook" />
                <SocialSigning social="Google+" />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SignUpForm;
