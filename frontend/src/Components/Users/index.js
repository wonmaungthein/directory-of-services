import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';

import NotificationSystem from 'react-notification-system';
import TopNav from '../TopNav';
import AddUser from './AddUser';
// import SignUpForm from './signUp';
import UsersListTable from './UsersListTable';
import usersData from './usersData.json';

import './users.css';

export default class UsersPage extends Component {
  state = {
    fullName: '',
    organisation: '',
    role: '',
    notificationSystem: null,
    hideForm: null,
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges,
    });
  }

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

  handleSubmit = e => {
    e.preventDefault();
    this.addNewUserHandler();
    this.setState({
      fullName: '',
      organisation: '',
      role: '',
    });
    this.savedChangesSuccessfully();
  };

  addNewUserHandler = () => {
    usersData.unshift({
      name: this.state.fullName,
      organisation: this.state.organisation,
      role: this.state.role,
    });
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });
    
  render() {
    let userForm;
    const { params } = this.props.match;
    const { hideForm } = this.state;
    const isAddUsersPage = params && params.form === 'add';
    if (!isAddUsersPage) {
      userForm = null;
    } else {
      userForm = (
        <Fragment>
          <h2 className="add-users"> Add User </h2>
          <AddUser
            handleSubmit={this.handleSubmit}
            handleFieldUpdate={this.handleFieldUpdate}
            fullName={this.state.fullName}
            organisation={this.state.organisation}
            role={this.state.role}
            savedChangesSuccessfully={this.savedChangesSuccessfully}
          />
        </Fragment>
      );
    }

    return (
      <div className="users">
        <TopNav title="USERS" addLink="users/add" titleLink="users" />
        {userForm}
        <NotificationSystem ref="savedChanges" />
        <UsersListTable />
        {hideForm ? <Redirect to="/users" /> : null}
      </div>
    );
  }
}
