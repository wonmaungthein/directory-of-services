import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import Login from './LoginForm';
import SignUpForm from '../Users/signUp';
import ForgotPassword from '../Users/forgot-password';
import Spinner from '../Spinner';
import './login-form.css';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    errors: {},
    userVerification: '',
    login: true,
    signup: false,
    reset: false,
  };

  validation = () => {
    let isError = false;
    const errors = {
      usernameErr: '',
      passwordErr: '',
    };
    if (this.state.username.length <= 0) {
      isError = true;
      errors.usernameErr = 'You have to add your username';
    }
    if (this.state.password.length <= 0) {
      isError = true;
      errors.passwordErr = 'You have to add your password';
    }
    this.setState({
      ...this.setState,
      errors,
    });
    return isError;
  };

  handleFieldsChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const errors = this.validation();
    if (!errors) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(user => {
        if (user.data && user.data.success !== false) {
          this.context.router.history.push('/home');
          this.setState({ isLoading: false });
        } else {
          this.setState({
            userVerification: user.data.message,
            isLoading: false,
          });
        }
      });
      this.setState({
        errors: {},
        isLoading: true,
        username: '',
        password: '',
        userVerification: '',
      });
    }
  };

  switchPageHandler = page => {
    let userLogin;
    let userSignup;
    let userReset;
    if(page === 'login') {
      userLogin = true;
      userSignup = false
      userReset = false
    } else if (page === 'signup'){
      userLogin = false;
      userReset = false
      userSignup = true
    } else {
      userLogin = false;
      userReset = true
      userSignup = false
    }
    this.setState({
      login: userLogin,
      signup: userSignup,
      reset: userReset,
    });
  }
  handleBlur = e => {
    e.preventDefault();
    this.setState({ userVerification: '' });
  };

  render() {
    const { usernameErr, passwordErr } = this.state.errors;
    if (this.state.isLoading) {
      return <Spinner />;
    }
    const logins = (<Login 
      username={this.state.username}
      password={this.state.password}
      userVerification={this.state.userVerification}
      handleFieldsChange={this.handleFieldsChange}
      handleLogin={this.handleLogin}
      handleBlur={this.handleBlur}
      usernameErr={usernameErr}
      passwordErr={passwordErr}
    />);
    return (
      <Fragment>
        <div className="sign-title">
          <Button onClick={()=>this.switchPageHandler('login')}>Login</Button>
          <Button onClick={() => this.switchPageHandler('signup')}>Register</Button>
          <Button onClick={() => this.switchPageHandler('reset')}>Reset</Button>
        </div>
        {this.state.login ? logins: null}
        {this.state.signup ? <SignUpForm />: null}
        {this.state.reset ? <ForgotPassword />: null}
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};
LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default connect(null, { login })(LoginForm);
