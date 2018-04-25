import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import ForgotPassword from '../Users/forgot-password'
import { deleteFlashMessage } from '../../actions/flashMessages';
import './landing-page.css';

const LandingPage = (props) => {

  const renderMessages = () => (
    props.messages.map(message => message.type === 'loginError' ? message.text : null).join('')
  );

  const deleteMessage = () => (
    props.messages.map(message => message.type === 'loginError' ? props.deleteFlashMessage(message.id) : null)
  );

  const showRrrorMessage = () => {
    const errorMessage = renderMessages() ? <h3 className="login-error">{renderMessages()} <i tabIndex={0} role="button" onClick={deleteMessage} onKeyPress={deleteMessage} className="material-icons">close</i></h3> : null;
    return errorMessage;
  };

  return (
    <div className="landing-page">
      <div>
        {showRrrorMessage()}
        
        <ForgotPassword />
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  }
}

LandingPage.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { deleteFlashMessage })(LandingPage);
