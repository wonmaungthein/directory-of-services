import React, { Component } from 'react';

class UserProfile extends Component {
  state = {name: 'Ibramoha'}
  render() {
    return (
      <h1>{this.state.name}</h1>
    );
  }
}


export default UserProfile

