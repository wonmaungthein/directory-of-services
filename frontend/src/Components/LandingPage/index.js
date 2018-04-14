import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm';
import { deleteFlashMessage } from '../../actions/flashMessages';
import './landing-page.css';

const LandingPage = (props) => {

  const renderMessages = () => {
    const { messages } = props;
    return messages.map(message => message.type === 'loginError' ? message.text : null).join('')
  }

  const deleteMessage = () => {
    const { messages } = props;
    return messages.map(message => message.type === 'loginError' ? props.deleteFlashMessage(message.id) : null)
  }

  return (
    <div className="landing-page">
      <div>
        {renderMessages() ? <h3 className="login-error">{renderMessages()} <i tabIndex={0} role="button" onClick={deleteMessage} className="material-icons">close</i></h3> : null}
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

LandingPage.contextTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { deleteFlashMessage })(LandingPage);
