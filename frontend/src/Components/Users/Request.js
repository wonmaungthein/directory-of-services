import React, { Component, Fragment } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import TopNav from '../TopNav';
import { requestAccess } from '../../actions/loginActions';
import './Request.css'

class Request extends Component{
    state = {
        notificationSystem: null
    }
    componentDidMount() {
        this.setState({
          notificationSystem: this.refs.notificationSystem
        })
    }
    handleSubmit= (e)=> {
        const {email} = this.props
        this.props.requestAccess(email)
        e.preventDefault();
        this.state.notificationSystem.addNotification({
            message: 'You have successfuly reuested to become an editor',
            level: 'info',
            position: 'tr',
            autoDismiss: 10,
          });
    }
    render() {
        return(
          <Fragment>
            <TopNav title="USERS" addLink="users/form" titleLink="users" />
            <h2 className="request" >If you want to become an editor please click here. </h2>
            <button className="button" onClick={this.handleSubmit} > Request Editor Access</button>
            <NotificationSystem ref="notificationSystem" />
          </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
    email: state.loginAuth.user.email
    };
  }
export default connect (mapStateToProps, { requestAccess })(Request);

