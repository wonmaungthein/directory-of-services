import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  getListOfUsers } from '../../actions/getApiData';
import './top-nav.css';


class BubbleIcon extends Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
    };
  }

  componentWillReceiveProps(newProps) {
    const users = newProps.usersList;
    if (users) {
      this.setState({
        data: users,
      })
    }
  }
  countUsers = ({users}) => {
    const usersListEditorsRequested = []
    if (users){
      const y =  users.filter(user => user.hasRequestedEditor)
      usersListEditorsRequested.push(...y)
      }
      return usersListEditorsRequested.length

  }
  render() {
    const { data } = this.state;
    const usersList = data.length > 1 ? data : this.props.usersList;
    return(
      this.countUsers(usersList) !== 0 && <div><div className="BubbleIcon">{this.countUsers(usersList) === 0 ? null : this.countUsers(usersList) } </div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    usersList: state.listOfUsers
  };
}
export default connect(mapStateToProps, {getListOfUsers})(BubbleIcon);