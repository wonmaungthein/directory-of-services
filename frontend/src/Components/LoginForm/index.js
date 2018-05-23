import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import Button from 'material-ui/Button';
import Login from './LoginForm';
import SignUpForm from '../Users/signUp';
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
    if(page === 'login') {
      userLogin = true;
      userSignup = false
    } else {
      userLogin = false;
      userSignup = true
    }
    this.setState({
      login: userLogin,
      signup: userSignup,
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
    const login = (<Login 
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
        </div>
        {this.state.login ? login: null}
        {this.state.signup ? <SignUpForm />: null}
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
