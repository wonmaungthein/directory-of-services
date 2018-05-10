import React, { Component, Fragment } from 'react';
import Typography from 'material-ui/Typography';
import { FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { connect } from 'react-redux';
import { login } from '../../actions/loginActions';
import './login-form.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false,
    errors: {},
    userVerification: ''
  }

  validation = () => {
    let isError = false;
    const errors = {
      usernameErr: "",
      passwordErr: "",
    }
    if (this.state.username.length <= 0) {
      isError = true;
      errors.usernameErr = "You have to add your username";
    }
    if (this.state.password.length <= 0) {
      isError = true;
      errors.passwordErr = "You have to add your password";
    }
    this.setState({
      ...this.setState,
      errors
    })
    return isError;
  }

  handleFieldsChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault();
    const errors = this.validation();
    if (!errors) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(user => {
        if (user.data && user.data.success !== false) {
          this.context.router.history.push('/home')
        } else {
          this.setState({ userVerification: user.data.message, isLoading: false })
        }
      });
      this.setState({
        errors: {},
        isLoading: true,
        username: '',
        password: '',
        userVerification: ''
      });
    }
  }

  handleBlur = (e) => {
    e.preventDefault();
    this.setState({ userVerification: '' })
  }

  render() {
    const { usernameErr, passwordErr } = this.state.errors;
    return (
      <Paper className="login-form-content">
        <FormHelperText className="error">{this.state.userVerification}</FormHelperText>
        <Typography color="primary" variant="display3">
          Login
        </Typography>
        <form className="login-form">
          <Fragment>
            <TextField
              id="username"
              label="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldsChange}
              onBlur={this.handleBlur}
              margin="normal"
            />
            <FormHelperText className="error">{usernameErr}</FormHelperText>
          </Fragment>
          <Fragment>
            <TextField
              id="password"
              label="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldsChange}
              onBlur={this.handleBlur}
              margin="normal"
              type="password"
            />
            <FormHelperText className="error">{passwordErr}</FormHelperText>
          </Fragment>
          <Button onClick={this.handleLogin} variant="raised" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}
LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(null, { login })(LoginForm);
