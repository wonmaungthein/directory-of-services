import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';


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

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleClickOpen} raised>
          <i className="material-icons">delete</i>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
        <div>
          <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText className="modal-text">
              <p>Do wish to delete <b> {this.props.value} </b> premanently from the list ?</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.removeUser} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withMobileDialog()(Notification);
