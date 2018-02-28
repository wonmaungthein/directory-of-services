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
    orgonaizationName: "Haringey Migrant Service",
    advices: "- Help accessing NHS",
    process: "Call in advance (appt only)",
    day: "Monday",
    telephone: "028 297 4111",
    email: "test@test.co.uk",
    website: "http://www.haringeymsc.org",
    category: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const updateOrgonaization = {
      area: this.state.area,
      borough: this.state.borough,
      orgonaizationName: this.state.orgonaizationName,
      advices: this.state.advices,
      process: this.state.process,
      day: this.state.day,
      telephone: this.state.telephone,
      email: this.state.email,
      website: this.state.website,
      category: this.state.category
    }
    this.setState({
      area: "",
      borough: "",
      orgonaizationName: "",
      advices: "",
      process: "",
      day: "",
      telephone: "",
      email: "",
      website: "",
      category: "",
    });
    console.log(updateOrgonaization);
  }

  updateField = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckbox = e => {
    this.setState({
      category: e.target.value
    })
  }

  render() {
    return (
      <div>
        <button className="edit-button" onClick={this.handleClickOpen}>Edit</button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent className="edit-content">
            <span className="edit-logo">Editing</span>
            <OrganisationForm
              editOrgonaizationForm="edit-orgonaization-form"
              editOrgnasiationName="edit-orgnasiation-name"
              detailsArea="details-area"
              textField="text-field"
              textFieldTwo="text-field-two"
              healthAdviceTitle="health-advice-title"
              healthAdvice="health-advice"
              telephoneLabel="telephone-label"
              websiteLabel="website-label"
              emailLabel="email-label"
              notIncludeInEditOrg="not-include-in-editOrg"
              categoriesCheckboxTitle="categories-checkbox-title"
              categoriesCheckbox="categories-chckbox" 
              
              editfields="edit-field"
              editProcessfield="edit-process-field"
              editDateField="edit-day-field"
              textFieldContainer="text-field-container"
              textFieldTwoContainer="text-field-two-container"

              orgonaizationName="orgonaizationName"
              organisationNameValue={this.state.orgonaizationName}

              area="area"
              areaValue={this.state.area}

              borough="borough"
              boroughValue={this.state.borough}

              advices="advices"
              advicesValue={this.state.advices}

              process="process"
              processValue={this.state.process}

              day="day"
              dayValue={this.state.day}

              telephone="telephone"
              telephoneValue={this.state.telephone}

              email="email"
              emailValue={this.state.email}

              website="website"
              websiteValue={this.state.website}

              category1="category1"
              category2="category2"
              category3="category3"
              category4="category4"
              category5="category5"
              category6="category6"
              category7="category7"
              category8="category8"
              category9="category9"

              category1Id="category1"
              category2Id="category2"
              category3Id="category3"
              category4Id="category4"
              category5Id="category5"
              category6Id="category6"
              category7Id="category7"
              category8Id="category8"
              category9Id="category9"

              category1Name="category-1"
              category2Name="category-2"
              category3Name="category-3"
              category4Name="category-4"
              category5Name="category-5"
              category6Name="category-6"
              category7Name="category-7"
              category8Name="category-8"
              category9Name="category-9"

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
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}