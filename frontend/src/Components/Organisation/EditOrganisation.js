import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, withMobileDialog } from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import OrganisationForm from './OrganisationForm';
import { editOrganisation } from '../../actions/postData';
import helpers from '../../helpers';
import './edit-org.css';

class EditOrganisation extends React.Component {
  state = {
    notificationSystem: null,
    open: this.props.show,
    Organisation: "",
    Area: "",
    Borough: "",
    Services: [],
    Process: "",
    Day: [],
    Tel: "",
    Email: "",
    Website: "",
    Categories: [],
    orgId: null,
    branchId: null,
  };

  componentWillMount() {
    const data = this.props.editOrgData;
    if (data) {
      this.setState({
        branchId: data.branch_id,
        orgId: data.org_id,
        Organisation: data.org_name,
        Area: data.area,
        Borough: data.borough,
        Services: data.postcode,
        Process: data.process,
        Day: [data.service_days],
        Tel: data.telephone,
        Email: data.email_address,
        Website: data.website,
        Categories: [data.cat_name],

      })
    }
  }

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges
    })
  }

  savedChangesSuccessfully = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message,
      level: 'success',
    });
  }

  unSucessSavedChanges = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
      level: 'error',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const days = this.state.Day.join(' ');
    const categories = this.state.Categories.join(' ');
    const orgData = {
      branchId: this.state.branchId,
      orgId: this.state.orgId,
      organisation: this.state.Organisation,
      area: this.state.Area,
      borough: this.state.Borough,
      postcode: this.state.Services,
      process: this.state.Process,
      days: days,
      tel: this.state.Tel,
      email: this.state.Email,
      website: this.state.Website,
      categories: categories,
      address: "not provided",
      lat: "not provided",
      long: "not provided"
    }
    this.props.editOrganisation(orgData)
      .then(user => {
        if (user.data && user.data.success !== false) {
          this.savedChangesSuccessfully(user.data.message)
          this.setState({open:false})
          // this.context.router.history.push(`${this.props.location.pathname}`)
        } else {
          this.unSucessSavedChanges(user.data.message)
        }
      });
  };

  handleFieldUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckBox = event => {
    const listOfCategories = this.state.Categories;
    listOfCategories.push(event.target.value);
    this.setState({
      [event.target.name]: event.target.checked,
      Categories: listOfCategories
    });
  };

  handleMulitySelectChange = event => {
    this.setState({ Day: event.target.value });
  };

  handleClose = () => {
    this.props.stopEditing()
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);
    return (
      <div>
        <Button variant="fab" raised aria-label="edit" className="edit-button" onClick={this.props.getData}>
          <i className="material-icons">edit</i>
        </Button>
        <NotificationSystem ref="savedChanges" />
        <Dialog
          className="edit-org-dialog"
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className="edit-content">
            <span className="edit-logo">Editing</span>
            <OrganisationForm
              edit
              name={this.state.Organisation}
              service={this.state.Services}
              area={this.state.Area}
              selectedArea={this.state.Area}
              borough={this.state.Borough}
              selectedBorough={this.state.Borough}
              process={this.state.Process}
              day={this.state.Day}
              telephone={this.state.Tel}
              email={this.state.Email}
              website={this.state.Website}
              checkedCategory={checkedCategory}
              openSelect={this.state.openSelect}
              closeSelect={this.handleClose}
              handleMulitySelectChange={this.handleMulitySelectChange}
              formType="edit-org"
              handleCheckBox={this.handleCheckBox}
              onChangeCheckbox={this.handleCheckbox}
              onChange={this.handleFieldUpdate}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="cancel-button"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              onClick={this.handleSubmit}
              color="primary"
              size="small"
              autoFocus
            >
              <i className="material-icons">save</i>
            </Button>
            <button
              onClick={this.handleClose}
              className="edit-org-close-button"
            >
              Close<i className="material-icons">close</i>
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditOrganisation.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  editOrganisation: PropTypes.func.isRequired
};

EditOrganisation.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withMobileDialog()(connect(null, { editOrganisation })(withRouter(props => <EditOrganisation {...props} />)));
