import React, { Component, Fragment } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import TopNav from '../TopNav';
import { requestAccess } from '../../actions/loginActions';
import './Request.css'

class Request extends Component{
    state = {
        notificationSystem: null,
        requested: false
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
        this.setState({
            requested: true
          })
        this.state.notificationSystem.addNotification({
            message: 'You have successfully reuested to become an editor',
            level: 'info',
            position: 'tr',
            autoDismiss: 2,
          });
    }
    render() {
        return(
          <Fragment>
            <TopNav title="USERS" addLink="users/form" titleLink="users" />
            { this.state.requested === false &&
            <Fragment>
              <h2 className="request" >If you want to become an editor please click on the button. </h2>
              <button className="button" onClick={this.handleSubmit} > Request Editor Access</button>
            </Fragment>
           }
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

