import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import './users.css'

class Notification extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  checkComponentLink = () =>
    (
      this.props.match.url.includes('/users') ?
        <Button onClick={this.handleClickOpen} raised>
          <i className="material-icons">delete</i>
        </Button> :
        <Button variant="fab" aria-label="edit" className="edit-button" onClick={this.handleClickOpen} raised>
          <i className="material-icons delete-org">delete</i>
        </Button>
    )

  render() {
    return (
      <Fragment>
        {this.checkComponentLink()}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className="delete-notification">
            <DialogTitle>
              {this.props.match.url.includes('/users') ?
                "Are you sure want to delete this user" :
                "Are you sure want to delete this Organisation"
              }
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} variant="raised">
                Cancel
              </Button>
              <Button onClick={() => { this.props.removeHandler(); this.handleClose() }} variant="raised" color="secondary">
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withMobileDialog()((withRouter(props => <Notification {...props} />)));