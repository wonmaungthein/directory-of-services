import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, withMobileDialog } from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import OrganisationForm from './OrganisationForm';
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
  };

  componentWillMount() {
    const data = this.props.editOrgData;
    if (data) {
      this.setState({
        Organisation: data.Organisation,
        Area: data.Area,
        Borough: data.Borough,
        Services: data.Services,
        Process: data.Process,
        Day: data.Day,
        Tel: data.Tel,
        Email: data.Email,
        Website: data.Website,
        Categories: [data.Category],

      })
    }
  }

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges
    })
  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  }

  unSucessSavedChanges = () => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'Your Changes have not been saved successfully',
      level: 'error',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      Organisation: "",
      Area: "",
      Borough: "",
      Services: [],
      Process: "",
      Day: [""],
      Tel: "",
      Email: "",
      Website: "",
      Categories: [],
    });
    this.savedChangesSuccessfully()
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
    return (
      <div>
        <Button variant="fab" raised aria-label="edit"  className="edit-button" onClick={this.props.getData}>
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
              name={this.state.Organisation}
              service={this.state.Services}
              area={this.state.Area}
              borough={this.state.Borough}
              process={this.state.Process}
              day={this.state.Day}
              telephone={this.state.Tel}
              email={this.state.Email}
              website={this.state.Website}
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
};

export default withMobileDialog()(EditOrganisation);