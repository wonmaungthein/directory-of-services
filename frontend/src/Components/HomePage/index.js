import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import HomeSearch from './HomeSearch';
import { getOrganisationsList, getListOfUsers } from '../../actions/getApiData';
import { deleteFlashMessage } from '../../actions/flashMessages';
import FlashMessagesNotification from '../FlashMessages'

class HomePage extends Component {

  componentDidMount() {
    this.props.getOrganisationsList();
    this.props.getListOfUsers();
  }

  deleteMessage = () => (
    this.props.messages.map(message => 
      message.type === 'LOGIN_SUCCESS' ? 
      this.props.deleteFlashMessage(message.id) : null
  ));

  renderMessages = () => (
    this.props.messages.map(message => 
      message.type === 'LOGIN_SUCCESS' ? 
        <Fragment key={message.id}>
          {setTimeout(() => this.deleteMessage(),5000)}
          <FlashMessagesNotification 
            messageType='success' 
            message={message.text} 
            test={this.props.messages}
            deleteMessage={this.deleteMessage} 
          />
        </Fragment>
      : null
  ))

  render() {
    const organisations = this.props.organisations ? this.props.organisations.areas : [];
    return (
      <div>
        <TopNav homePage />
        <HomeSearch organisations={organisations}  />
        {this.renderMessages()}
      </div>
    )
  }
}

HomePage.propTypes = {
  getOrganisationsList: PropTypes.func.isRequired,
  getListOfUsers: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    organisations: state.organisationsList,
    messages: state.flashMessages,
  }
}

export default connect(mapStateToProps, { getOrganisationsList, getListOfUsers, deleteFlashMessage })(HomePage);
