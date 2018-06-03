import React, { Component, Fragment } from 'react';
import NotificationSystem from 'react-notification-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { requestRestPassword } from '../../../actions/postData';

import './forgotPassword.css';

class ForgotPassword extends Component {
  state = {
    email: '',
    notificationSystem: null,
    success: false
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.forgotPass,
    });
  }

  successRequest = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message,
      level: 'success',
    });
  };

  failRequest = message => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
      level: 'error',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    const siteHost = process.env.SIDE_HOST
    const siteEmail = process.env.SIDE_EMAIL
    if (email.length > 0) {
      this.props.requestRestPassword({ email, siteHost, siteEmail }).then(user => {
        if (user.data && user.data.success !== false) {
          this.successRequest('Your request has been sent to your email successfully')
          this.setState({ email: '', success: true })
        } else {
          this.failRequest(user.data.message)
        }
      })
    } else {
      this.failRequest('Email is required*');
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="forgot-password">
        <NotificationSystem ref="forgotPass" />
        <Paper className="form-card">
          {
            this.state.success ?
              <h3 className="success">To reset your password open your email and use the link sent to you!</h3>
              :
              <Fragment>
                <Typography color="primary" variant="display3">
                  Forgot password
                </Typography>
                <p className="forgot-info">
                  Enter your email address we will sent you the password reset link.
                </p>
                <Grid container spacing={24} onSubmit={this.handleSubmit}>
                  <form className="forgot-password-form">
                    <TextField
                      type='email'
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                    <Button variant="raised" size="small" type="submit" className="add-user-button">
                      Sent
                    </Button>
                  </form>
                </Grid>
              </Fragment>
          }
        </Paper>
      </div>
    );
  }
}

ForgotPassword.PropsType = {
  requestRestPassword: PropTypes.func.isReqired,
}

export default connect(null, { requestRestPassword })(ForgotPassword);
