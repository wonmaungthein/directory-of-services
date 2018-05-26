import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { deleteFlashMessage } from '../../actions/flashMessages';
import './landing-page.css';

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

  showSignUpForm = () => (
    <LoginForm />
  )

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
