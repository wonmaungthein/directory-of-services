import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import OrganisationForm from './OrganisationForm';
import './organisation.css';

export default class EditOrganisation extends React.Component {
  state = {
    open: false,
    area: "North",
    borough: "Haringey",
    name: "Haringey Migrant Service",
    advices: "- Help accessing NHS",
    process: "Call in advance (appt only)",
    day: "Monday",
    telephone: "028 297 4111",
    email: "test@test.co.uk",
    website: "http://www.haringeymsc.org",
    category: [],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.setState({
      area: "",
      borough: "",
      name: "",
      advices: "",
      process: "",
      day: "",
      telephone: "",
      email: "",
      website: "",
      category: "",
    });
  }

  updateField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckbox = e => {
    const listOfCategories = this.state.category;
    listOfCategories.push(e.target.value);
    this.setState({
      category: listOfCategories
    })
  }

  render() {
    return (
      <div>
        <button className="edit-button" onClick={this.handleClickOpen}>Edit</button>
        <Dialog
          className="edit-org-dialog"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className="edit-content">
            <span className="edit-logo">Editing</span>
            <OrganisationForm
              
              organisationNameValue={this.state.name}
              areaValue={this.state.area}
              boroughValue={this.state.borough}
              advicesValue={this.state.advices}
              processValue={this.state.process}
              dayValue={this.state.day}
              telephoneValue={this.state.telephone}
              emailValue={this.state.email}
              websiteValue={this.state.website}

              editOrg="edit-org"
              onChange={this.updateField}
              onChangeCheckbox={this.handleCheckbox}
            />
          </DialogContent>
          <DialogActions>
            <Button className="cancel-button" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button className="save-button" onClick={this.handleSubmit} color="primary" autoFocus>
              Save change
            </Button>
            <button onClick={this.handleClose} className="edit-org-close-button">Close</button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}