import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  getListOfUsers } from '../../actions/getApiData';
import "./bubble.css"


class Bubble extends Component{
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
  userListCount = ({users}) => {
    const xx = []
    if (users){
      const y =  users.filter(user => user.hasRequestedEditor)
      xx.push(...y)
      }
      return xx.length

  }
  render() {
    const { data } = this.state;
    const usersList = data.length > 1 ? data : this.props.usersList;
    return(
      <div><div className={this.userListCount(usersList) === 0 ? null : "bubble"}>{this.userListCount(usersList) === 0 ? null : this.userListCount(usersList) } {this.props.children}</div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    usersList: state.listOfUsers
  };
}
export default connect(mapStateToProps, {getListOfUsers})(Bubble);