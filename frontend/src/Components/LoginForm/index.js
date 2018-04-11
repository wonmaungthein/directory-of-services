import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import './login-form.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  handleFieldsChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.history.push('/home');
  }

  render() {
    return (
      <Paper className="login-form-content">
        <Typography color="primary" variant="display3">
          Login
        </Typography>
        <form className="login-form">
          <TextField
            id="username"
            label="Username"
            value={this.state.username}
            onChange={this.handleFieldsChange}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleFieldsChange}
            margin="normal"
          />
          <Button onClick={this.handleSubmit} variant="raised" color="primary">
            Submit
          </Button>
        </form>
      </Paper>
    )
  }
}

export default withRouter(props => <LoginForm {...props} />);
