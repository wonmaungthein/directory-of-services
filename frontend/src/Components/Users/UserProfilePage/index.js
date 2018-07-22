  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import PropTypes from 'prop-types';
  import TopNav from '../../TopNav';

  class UserProfile extends Component {
    constructor(props){
      super(props)
      this.state ={}
    }
    render(){
      const users = this.props.userInfo ? this.props.userInfo : [] ;
      return (
        <div>
          <TopNav />
          <h4>{Object.entries(users).map(([key, value]) => <li>({key}: {value})</li>)}</h4>
        </div>
      )
    }
  }
    function mapStateToProps(state) {
      return {
        userInfo: state.loginAuth.user,
      }
    }

    UserProfile.PropsTypes = {
      userInfo: PropTypes.array.isRequired,
    }

    export default connect(mapStateToProps)(UserProfile);
