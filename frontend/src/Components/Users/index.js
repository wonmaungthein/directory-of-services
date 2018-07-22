import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import { getListOfUsers} from '../../actions/getApiData';
import TopNav from '../TopNav';
import AddUser from './AddUser';
import UserProfile from './UserProfilePage'
import UsersListTable from './UsersListTable';

import './users.css';

class UsersPage extends Component {
  state = {
    fullname: '',
    organisation: '',
    role: '',
    notificationSystem: null,
    hideForm: null,
  };

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });

    setTimeout(() => {
      this.setState({
        hideForm: !this.state.hideForm,
      });
    }, 500);
  };

  failedSavedChanges = () => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'We could not save your changes',
      level: 'error',
    });
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const users = this.props.listOfUsers.users ? this.props.listOfUsers.users : [] ;
    let userForm;
    let userList;
    const params  = this.props.location.pathname;
    const isAddUsersPage = params && params.includes('form');
    const isProfile = params && params.includes('admindos');
    const { hideForm } = this.state;
    const result = users.map(user => (user.role));
    if (result[0]=== 'Admin' ) {
      userList = (
        <UsersListTable
          usersList={users}
        />)
    } else if(isProfile){
      userList = (
        <UsersListTable
          usersList={users}
        />)
    }

    else {
      userList = (
        <UserProfile
          usersList={users}
        />
      );
    }

    if (!isAddUsersPage) {
      userForm = null;
    } else {
      userForm = (
        <Fragment>
          <h2 className="add-users"> Add User </h2>
          <AddUser
            handleSubmit={this.handleSubmit}
            handleFieldUpdate={this.handleFieldUpdate}
            fullname={this.state.fullname}
            organisation={this.state.organisation}
            role={this.state.role}
            savedChangesSuccessfully={this.savedChangesSuccessfully}
          />
        </Fragment>
      );
    }


    return (
      <div className="users">
        <TopNav title="USERS" addLink="users/form" titleLink="users" />
        {userForm}
        <NotificationSystem ref="savedChanges" />
        {userList}
        {hideForm ? <Redirect to="/users" /> : null}
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    listOfUsers:state.listOfUsers
  }
}

UsersPage.PropsTypes = {
  listOfUsers: PropTypes.array.isRequired,
}

UsersPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { getListOfUsers })(UsersPage);