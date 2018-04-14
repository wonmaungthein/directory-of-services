import React, { Component } from 'react';
import SignUpFields from './SignUpFields';

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
        <SignUpFields
          fullName={this.state.fullName}
          email={this.state.email}
          password={this.state.password}
          retypePassword={this.state.retypePassword}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SignUpForm;
