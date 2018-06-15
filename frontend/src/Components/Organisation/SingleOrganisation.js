import React, { Component, Fragment } from 'react';
import Dialog, {
  withMobileDialog,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import EditOrganisation from './EditOrganisation';
import './single-org.css';

class SingleOrganisation extends Component {
  state = {
    open: false,
    editIdx: -1,
  };

  editSelectedOrganisation = index =>
    this.setState({
      editIdx: index,
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
    const { org } = this.props;
    const index = 1;
    const { editIdx } = this.state;
    const currentlyEditing = editIdx === index;
    const uiMessage = 'Add';

    return currentlyEditing ? (
      <EditOrganisation
        editOrgData={org}
        stopEditing={this.stopEditing}
        show
      />
    ) : (
      <Fragment>
        <div className="org-detail-btn">
          <Button
            onClick={this.editSelectedOrganisation}
            variant="raised"
            size="small"
            className="btn detail-button"
          >
            <i className="material-icons">add</i>DETAILS
          </Button>
        </div>  
        <Dialog
          className="org-info"
          open={this.state.open}
          onClose={this.handleClose}
        >

          <div className="org-close-btn">
            <Button
              onClick={this.handleClose}
              className="btn close-button"
            >
              <i className="material-icons" variant="raised" size="small">close</i>
            </Button>
          </div> 

          <EditOrganisation
            getData={() => this.editSelectedOrganisation(index)}
          />
          <h1> {org.org_name} </h1>
          <h6 className="details-area">
            Area: {org.area} | Borough: {org.borough}
          </h6>
          
          <div className="org-project">
            {org.project ? <Fragment> <h4>Project</h4> <p className="service"> {org.project}</p>  </Fragment>
              :<p className="not-available">{uiMessage} project...</p>}
          </div>
          <div className="org-service">
            {org.service? <Fragment> <h4>Services</h4> <p className="service"> {org.service}</p></Fragment>: 
            <p className="not-available">{uiMessage} services...</p>}
          </div>

          <div className="org-process">
            <div>
              {org.process ? <Fragment><h4>Process</h4><p className="service">{org.process} </p> </Fragment> 
                :<p className="not-available">{uiMessage} process...</p>}
            </div>
            <div>
              {org.service_days? <Fragment><h4>Days</h4> <p>{org.service_days}</p></Fragment>
                  :<p className="not-available">{uiMessage} days...</p>}
            </div>
          </div>

          <div className="org-contact">
            <div>
              {org.telephone? <Fragment><h4>Telephone</h4> <p>{org.telephone}</p></Fragment>
                  :<p className="not-available" disable>{uiMessage} telephone...</p>}
            </div>

            <div>
              {org.email_address? <Fragment><h4>Email</h4> <p>{org.email_address}</p></Fragment>
                  :<p className="not-available">{uiMessage} email ...</p>}
            </div>
          </div>

          {org.website ? <Fragment> <div className="org-website"><a className="website-link" target="blank" href={`${org.website}`}>{org.website}</a></div></Fragment>
              : <p className="not-available"> {uiMessage} website... </p>}
          <div className="org-service">
            {org.tag ?   <Fragment><h4>Tags</h4><p className="tag service"> <img src="https://png.icons8.com/material/15/666666/tag-window.png" alt="tag" /> {org.tag}</p></Fragment>
              : <p className="not-available">  {uiMessage} tags... </p>}
          </div>
        </Dialog>
      </Fragment>
    );
  }
}



export default withMobileDialog()(SingleOrganisation);
