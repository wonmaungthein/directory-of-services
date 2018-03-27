import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
  withMobileDialog,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import EditOrganisation from './EditOrganisation';
import './single-org.css';

class SingleOrganisation extends Component {
  state = {
    open: false,
    editIdx: -1,
  };

  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
      open: true,
    });

  stopEditing = () => {
    this.setState({
      editIdx: -1,
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const data = this.props.editOrgData;
    const { fullScreen } = this.props;
    const index = 1;
    const { editIdx } = this.state;
    const currentlyEditing = editIdx === index;

    return currentlyEditing ? (
      <EditOrganisation
        editOrgData={data}
        stopEditing={this.stopEditing}
        show
      />
    ) : (
      <div className="single-oganisation">
        <Button
          onClick={this.editSelectedOrganisation}
          variant="raised"
          size="small" 
          className="orgnaization-detais-button button-title"
        >
          <i className="material-icons">add</i>DETAILS
        </Button>
        <Dialog
          fullScreen={fullScreen}
          className="single-org-dialog"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogActions>
            <button
              onClick={this.handleClose}
              className="single-oganisation-close-button"
            >
              Close<i className="material-icons">close</i>
            </button>
          </DialogActions>
          <EditOrganisation
            getData={() => this.editSelectedOrganisation(index)}
          />
          <DialogTitle
            className="single-oganisation-title"
            id="alert-dialog-title"
          >
            {data.Organisation}
          </DialogTitle>
          <DialogContent className="single-oganisation-content">
            <h4 className="details-area">
              Area: {data.Area} | Borough: {data.Borough}
            </h4>
            <div className="health-advice-process">
              <h4> Services</h4>
              <p className="service"> {data.Services}</p>
            </div>
            <div className="single-process-date">
              <div>
                <h4>Process</h4>
                <p className="service">{data.Process}</p>
              </div>
              <div>
                <h4>Days</h4>
                <p>{data.Day}</p>
              </div>
            </div>
            <div className="single-telephone-email">
              <div>
                <h4>Telephone</h4>
                <p>{data.Tel}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{data.Email}</p>
              </div>
            </div>
            <h4>Website</h4>
            <a className="website-link" target="blank" href={`${data.Website}`}>
              <h5 className="">{data.Website}</h5>
            </a>
          </DialogContent>
          <DialogActions>
            <Button
              variant="fab"
              className="exit"
              onClick={this.handleClose}
              color="primary"
            >
              <i className="material-icons">exit_to_app</i>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SingleOrganisation.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(SingleOrganisation);
