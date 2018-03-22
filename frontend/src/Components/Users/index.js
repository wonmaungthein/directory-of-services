import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import TopNav from '../TopNav';
import AddUser from './AddUser';
import UsersListTable from './UsersListTable';
import './users.css';

export default class UsersPage extends Component {
  state = {
    fullName: '',
    email: '',
    role: 'editor',
    notificationSystem: null,
    isFormRemove: false,
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
    this.setState({
      isFormRemove: !this.state.isFormRemove,
    });
  };

  unSucessSavedChanges = () => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'Your Changes have not been saved successfully',
      level: 'error',
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      fullName: '',
      email: '',
      role: 'editor',
      isFormRemove: !this.state.isFormRemove,
    });
    this.savedChangesSuccessfully();
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });
  render() {
    let userForm;
    const { params } = this.props.match;
    const showAddUsersForm = params && params.form === 'add';
    if (this.state.isFormRemove || !showAddUsersForm) {
      userForm = null;
    } else {
      
      userForm = (
        <AddUser
          handleSubmit={this.handleSubmit}
          handleFieldUpdate={this.handleFieldUpdate}
          fullName={this.state.fullName}
          email={this.state.email}
          role={this.state.role}
          savedChangesSuccessfully={this.savedChangesSuccessfully}
        />
      );
    }

    return (
      <div className="users">
        <TopNav title="USERS" addLink="users/add" titleLink="users" />
        {userForm}
        <NotificationSystem ref="savedChanges" />
        <UsersListTable />
      </div>
    );
  }
}
