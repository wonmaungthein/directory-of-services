import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import { deleteBranch, deleteUser } from '../../actions/postData';
import './users.css'

class Notification extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        open: false,
        userId: props.userId,
        branchIds: props.branchIds,
        notificationSystem: null,
      }
    }

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.deleteUser
    })
  }

  deletedSuccessfully = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message,
      level: 'success',
    });
  }

  notDeletedSuccessfully = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
      level: 'error',
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = (e) => {
    e.preventDefault()
    const { branchIds, userId } = this.state;

    if (this.props.deleteOrg) {
      this.props.deleteBranch(branchIds)
      .then(deletedBranch => {
        if (deletedBranch && deletedBranch.success) {
          this.deletedSuccessfully(deletedBranch.message)
          this.context.router.history.push(`${this.props.match.url}`)
        }else{
          this.notDeletedSuccessfully(deletedBranch.message)
          this.context.router.history.push(`${this.props.match.url}`)
        }
      })
    }else{
    this.props.deleteUser(userId)
    .then(deletedUser => {
      if (deletedUser && deletedUser.success) {
        this.deletedSuccessfully(deletedUser.message)
        this.context.router.history.push('/admindos')
      }else{
        this.notDeletedSuccessfully(deletedUser.message)
        this.context.router.history.push('/admindos')
      }
    })
    }
  };

  checkComponentLink = () =>{
    const { url } = this.props.match;
    // // Add different style to delete button
    return  (
      <Button
        variant={url.includes('admindos') || url.includes('accept')  ? null : 'fab'}
        color={url.includes('admindos') || url.includes('accept') ?  null :  'secondary'}
        className={url.includes('admindos') || url.includes('accept') ? null : 'delete'}
        onClick={this.handleClickOpen}
      >
        <i className="material-icons">delete</i>
        Delete
      </Button>
    )
  }

  render() {
    return (
      <Fragment>
        {this.checkComponentLink()}
        <NotificationSystem ref="deleteUser" />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className="delete-notification">
            <DialogTitle>
              {this.props.match.url.includes('/users') ?
              `Are you sure you want to delete ${this.props.value} from the list` :
                `Are you sure want to delete ${this.props.organisation}`
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} variant="raised">
                Cancel
              </Button>
              <Button onClick={this.handleDelete} variant="raised" color="secondary">
                Yes
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

Notification.propTypes = {
  deleteBranch: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
}

Notification.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withMobileDialog()(connect(null, { deleteUser, deleteBranch })(withRouter(props => <Notification {...props} />)));
