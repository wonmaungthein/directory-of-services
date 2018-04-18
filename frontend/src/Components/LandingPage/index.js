import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { deleteFlashMessage } from '../../actions/flashMessages';
import './landing-page.css';

const LandingPage = ({ messages, deleteFlashMessage }) => {

  const renderMessages = () => (
    messages.map(message => message.type === 'loginError' ? message.text : null).join('')
  );

  const deleteMessage = () => (
    messages.map(message => message.type === 'loginError' ? deleteFlashMessage(message.id) : null)
  );

  const showRrrorMessage = () => {
    const errorMessage = renderMessages() ? <h3 className="login-error">{renderMessages()} <i tabIndex={0} role="button" onClick={deleteMessage} onKeyPress={deleteMessage} className="material-icons">close</i></h3> : null;
    return errorMessage;
  };

  return (
    <div className="landing-page">
      <div>
        {showRrrorMessage()}
        <LoginForm />
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
