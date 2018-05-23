import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import LoginForm from '../LoginForm';
// import ForgotPassword from '../Users/forgot-password';  waiting Mohammad change to define route for this component
import { deleteFlashMessage } from '../../actions/flashMessages';
import './landing-page.css';
// import SignUpForm from '../Users/signUp';

class LandingPage extends Component {

  state = {
    open: false
  }

  deleteMessage = () => (
    this.props.messages.map(message => message.type === 'loginError' ? this.props.deleteFlashMessage(message.id) : null)
  );

  showRrrorMessage = () => {
    const errorMessage = this.renderMessages() ? <h3 className="login-error">{this.renderMessages()} <i tabIndex={0} role="button" onClick={this.deleteMessage} onKeyPress={this.deleteMessage} className="material-icons">close</i></h3> : null;
    return errorMessage;
  };

  showSignUpForm = () => {
    if (this.state.open) {
      // return <SignUpForm />
    }
      return <LoginForm />
  }

  renderMessages = () => (
    this.props.messages.map(message => message.type === 'loginError' ? message.text : null).join('')
  );

  renderSignUpPage = (e) => {
    e.preventDefault()
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="landing-page">
        <div className="login-content">
          <Button onClick={this.renderSignUpPage} size="small" className="signup" variant="raised" color="secondary">
            {this.state.open ? 'Login' : 'SignUp'}
          </Button>
          {this.showRrrorMessage()}
          {this.showSignUpForm()}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages,
  };
}

LandingPage.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteFlashMessage })(LandingPage);
