import React from 'react';
import Button from 'material-ui/Button';
import OrganisationForm from './OrganisationForm'
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import './edit-org.css'

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
      category: ""
    })
  }

  handleChange = e => {
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
              healthAdviceProcess="health-advice-process"
              healthAdvice="health-advice"
              processDate="process-date"
              processClass="process"
              dateClass="date"
              telephoneEmail="telephone-email"
              telephone="telephone"
              email="email"
              categoriesCheckboxTitle="categories-checkbox-title"
              categoriesCheckbox="categories-chckbox"

              advices="advices"
              advicesValue={this.state.advices}
/>
            {/* <form className="edit-orgonaization-form">
              <TextField
                fullWidth
                name="orgonaizationName"
                value={this.state.orgonaizationName}
                onChange={e => this.handleChange(e)}
                className="edit-orgnasiation-name"
              />
              <h6 className="details-area">Area:
                <TextField
                  className="text-field"
                  fullWidth={false}
                  name="area"
                  value={this.state.area}
                  onChange={e => this.handleChange(e)}
                /> | Borough:
                <TextField
                  className="text-field-two"
                  fullWidth={false}
                  name="borough"
                  value={this.state.borough}
                  onChange={e => this.handleChange(e)}
                />
              </h6>
              <div className="health-advice-process">
                <h4>- Health advice</h4>
                <TextField
                  className="health-advice"
                  fullWidth
                  name="advices"
                  value={this.state.advices}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="process-date">
                <div className="process">
                  <h4>Process</h4>
                  <TextField
                    className="health-advice"
                    fullWidth
                    name="process"
                    value={this.state.process}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="date">
                  <h4>Day</h4>
                  <TextField
                    className="health-advice"
                    fullWidth
                    name="day"
                    value={this.state.day}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="telephone-email">
                <div className="telephone">
                  <h4>Telephone</h4>
                  <TextField
                    className="health-advice"
                    fullWidth
                    name="telephone"
                    value={this.state.telephone}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="email">
                  <h4>Email</h4>
                  <TextField
                    className="health-advice"
                    fullWidth
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <TextField
                fullWidth
                name="website"
                value={this.state.website}
                onChange={e => this.handleChange(e)}
              />
              <h4 className="categories-checkbox-title">Categories</h4>
              <div className="categories-chckbox">
                <label htmlFor="category1">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category1" name="category-1" value="Debt" />  
                  Debt
                </label>
                <label htmlFor="category2">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category2" name="category-2" value="ypfamilies" />  
                  YP Families
                </label>
                <label htmlFor="category3">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category3" name="category-3" value="womendv" />  
                  Women DV
                </label>
                <label htmlFor="category4">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category4" name="category-4" value="trafficking" />  
                  Trafficking
                </label>
                <label htmlFor="category5">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category5" name="category-5" value="healthcare" />  
                  HealthCare
                </label>
                <label htmlFor="category6">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category6" name="category-6" value="destitution" />  
                  Destitution
                </label>
                <label htmlFor="category7">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category7" name="category-7" value="lgbtqi" />  
                  LGBTQI
                </label>
                <label htmlFor="category8">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category8" name="category-8" value="mentalhealthservices" />  
                  Mental Health Services
                </label>
                <label htmlFor="category9">
                  <input onChange={this.handleCheckbox} type="checkbox" id="category9" name="category-9" value="healthcare" />  
                  Healthcare
                </label>
              </div>
            </form> */}
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