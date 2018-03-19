import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import NotificationSystem from 'react-notification-system';
import OrganisationForm from './OrganisationForm';
import './edit-org.css';

export default class EditOrganisation extends React.Component {
  state = {
    notificationSystem: null,
    open: this.props.handleClichOpen,
    Organisation: "",
    Area: "",
    Borough: "",
    Services: "",
    Process: "",
    Day: [],
    Tel: "",
    Email: "",
    Website: "",
    Category: [],
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
        Category: [data.Category],

      })
    }
  }

  componentDidMount() {
    this.state.notificationSystem = this.refs.savedChanges
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
      Services: "",
      Process: "",
      Day: [""],
      Tel: "",
      Email: "",
      Website: "",
      Category: [],
    });
    this.savedChangesSuccessfully()
  };

  handleFieldUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckbox = e => {
    const listOfCategories = this.state.Category;
    listOfCategories.push(e.target.value);
    this.setState({
      Category: listOfCategories,
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
    return (
      <div>
        <Button variant="fab" raised aria-label="edit"  className="edit-button" onClick={this.props.getData}>
          <i className="material-icons">edit</i>
        </Button>
        <NotificationSystem ref="savedChanges" />
        <Dialog
          className="edit-org-dialog"
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
              onChange={this.handleFieldUpdate}
              onChangeCheckbox={this.handleCheckbox}
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
              <i className="material-icons">close</i>
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
