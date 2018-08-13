import React from 'react'
import './style.css'

export default function FlashMessagesNotification(props) {
    const { deleteMessage, messageType, message } = props;
    return (
      <div className="container">
        <div className={messageType === 'success' ? 'success' : 'error'}>
          <h3 className="label">{messageType === 'success' ? 'Success' : 'Error'}</h3>
          <p className="description">
            {message}
            <i tabIndex={0} role="button" onClick={deleteMessage} onKeyPress={props.deleteMessage} className="close">×</i>
          </p>
          <div className="auto-notification-delete">
            {setTimeout(() => deleteMessage(),5000)}
          </div>
        </div>
      </div>
    )
}
