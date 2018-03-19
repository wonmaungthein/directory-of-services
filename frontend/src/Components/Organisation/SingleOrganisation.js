import React, { Component } from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import EditOrganisation from './EditOrganisation';
import './single-org.css';

export default class SingleOrganisation extends Component {
  state = {
    open: false,
    editIdx: -1,
  };

  editSelectedOrganisation = (idex) => (
    this.setState({
      editIdx: idex,
      open: true,
    })
  );

  stopEditing = () => {
    this.setState({
      editIdx: -1,
      open: false
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
    const index = 1;
    const { editIdx } = this.state;
    const currentlyEditing = editIdx === index;

    return currentlyEditing ? <EditOrganisation editOrgData={data} stopEditing={this.stopEditing} show /> :
      (
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
            className="single-org-dialog"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogActions>
              <button
                onClick={this.handleClose}
                className="single-oganisation-close-button"
              >
                <i className="material-icons">close</i>
              </button>
            </DialogActions>
            <EditOrganisation getData={() => this.editSelectedOrganisation(index)} />
            <DialogTitle
              className="single-oganisation-title"
              id="alert-dialog-title"
            >
              {data.Organisation}
            </DialogTitle>
            <DialogContent className="single-oganisation-content">
              <h4 className="details-area">Area: {data.Area} | Borough: {data.Borough}</h4>
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
              <a
                className="website-link"
                target="blank"
                href={`${data.Website}`}
              >
                Website
              </a>
              <h5 className="detail-footer">
                {data.Category}
              </h5>
            </DialogContent>
          </Dialog>
        </div>
      );
  }
}
