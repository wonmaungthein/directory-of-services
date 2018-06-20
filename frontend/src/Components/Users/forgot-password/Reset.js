import React, { Component, Fragment } from 'react';
import NotificationSystem from 'react-notification-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { requestChangePassword, validateToken } from '../../../actions/postData';

import './forgotPassword.css';

class Reset extends Component {
  state = {
    password: '',
    confirm: '',
    notificationSystem: null,
    userId: '',
    email: '',
    validTokent: false,
    token: ''
  };

  componentWillMount() {
    const { token } = this.props.match.params;
    this.props.validateToken(token).then(user => {
      if (user.data && user.data.success !== false) {
        this.setState({
          userId: user.data.userId,
          email: user.data.email,
          validTokent: user.data.success,
          token
        })
      }
    })
  }

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
    const { password, confirm, userId, email, token } = this.state;
    const siteEmail = process.env.SIDE_EMAIL;
    if (password.length > 0 && password.length > 0 && password === confirm) {
      this.props.requestChangePassword({ password, confirm, userId, email, token, siteEmail }).then(user => {
        if (user.data && user.data.success !== false) {
          this.successRequest('Your password has been changed successfully');
          this.setState({ password: '', confirm: '' })
          setTimeout(() => this.context.router.history.push('/'), 2000);
        } else {
          this.failRequest(user.data.message)
        }
      })
    } else {
      this.failRequest('new password and confirn password are not match');
    }

  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="reset">
        <div className="forgot-password">
          <NotificationSystem ref="forgotPass" />
          <Paper className="form-card">
            {
              this.state.validTokent ?
                <Fragment>
                  <Typography color="primary" variant="display3">
                    Reast password
                  </Typography>
                  <p className="forgot-info">Enter your new password.</p>
                  <Grid container spacing={24} onSubmit={this.handleSubmit}>
                    <form className="forgot-password-form">
                      <TextField
                        type='password'
                        placeholder="New Password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                      <TextField
                        type='password'
                        placeholder="Confirm New Password"
                        id="confirm"
                        name="confirm"
                        value={this.state.confirm}
                        onChange={this.handleChange}
                        required
                      />
                      <Button variant="raised" size="small" type="submit" className="add-user-button">
                        Submit
                      </Button>
                    </form>
                  </Grid>
                </Fragment>
                :
                <h3 className="fail">Your link is not valid you have to request again to rest your password</h3>
            }
          </Paper>
        </div>
      </div>
    );
  }
}

Reset.PropsType = {
  requestChangePassword: PropTypes.func.isReqired,
}

Reset.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(null, { requestChangePassword, validateToken })(Reset);
