import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { Redirect } from 'react-router-dom';
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
    save: false,
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
      save: !this.state.save,
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
    this.savedChangesSuccessfully();
    this.setState({
      fullName: '',
      email: '',
      role: 'editor',
      save: !this.state.save,
    });
    console.log('this.state.fullName');
    if(this.state.save){
    window.location = '/users/';
    }
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const { params } = this.props.match;
    const showAddUsersForm = params && params.form === 'add';
    let userForm = (
      <AddUser
        handleSubmit={this.handleSubmit}
        handleFieldUpdate={this.handleFieldUpdate}
        name={this.state.fullName}
        email={this.state.email}
        role={this.state.role}
        savedChangesSuccessfully={this.savedChangesSuccessfully}
      />
    );

    if (this.state.save || !showAddUsersForm) {
      userForm = (<Redirect to='/users' />);
    } else {
       userForm
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
