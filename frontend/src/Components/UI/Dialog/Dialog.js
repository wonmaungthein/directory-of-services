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
            <DialogTitle id="responsive-dialog-title">
              {this.props.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="modal-text">
                <p>
                  Are you sure you want to delete <b> {this.props.value} </b>{' '}
                  from the list ?
                </p>
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

// element.style {
//     background: #51c2d8;
//     border-radius: 50%;
//     color: #fafbfb;
//     outline: none;
//     border: 0;
//     margin: 3px;
// }
