import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
} from 'material-ui/Dialog';
import './organisation.css'

class EditOrganisation extends React.Component {
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
    console.log(updateOrgonaization)
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
            <form className="edit-orgonaization-form">
              <TextField
                fullWidth={true}
                name="orgonaizationName"
                value={this.state.orgonaizationName}
                onChange={e => this.handleChange(e)}
              />
              <h6 className="details-area">Area: <TextField
                className="text-field"
                fullWidth={false}
                name="area"
                value={this.state.area}
                onChange={e => this.handleChange(e)}
              /> | Borough:<TextField
                  className="text-field-two"
                  fullWidth={false}
                  name="borough"
                  value={this.state.borough}
                  onChange={e => this.handleChange(e)}
                />
              </h6>
              <div className="health-advice-process">
                <p><strong>- Health advice</strong></p>
                <TextField
                  className="health-advice"
                  fullWidth={true}
                  name="advices"
                  value={this.state.advices}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className="process-date">
                <div className="process">
                  <h3><strong>Process</strong></h3>
                  <TextField
                    className="health-advice"
                    fullWidth={true}
                    name="process"
                    value={this.state.process}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="date">
                  <h3><strong>Day</strong></h3>
                  <TextField
                    className="health-advice"
                    fullWidth={true}
                    name="day"
                    value={this.state.day}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <div className="telephone-email">
                <div className="telephone">
                  <h3><strong>Telephone</strong></h3>
                  <TextField
                    className="health-advice"
                    fullWidth={true}
                    name="telephone"
                    value={this.state.telephone}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="email">
                  <h3><strong>Email</strong></h3>
                  <TextField
                    className="health-advice"
                    fullWidth={true}
                    name="email"
                    value={this.state.email}
                    onChange={e => this.handleChange(e)}
                  />
                </div>
              </div>
              <TextField
                fullWidth={true}
                name="website"
                value={this.state.website}
                onChange={e => this.handleChange(e)}
              />
              <span className="categories-checkbox-title"><strong>Categories</strong></span>
              <div className="categories-chckbox">
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="Debt" /><span> Debt</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="ypfamilies" /><span> YP Families</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="womendv" /><span> Women DV</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="trafficking" /><span> Trafficking</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="healthcare" /><span> HealthCare</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="destitution" /><span> Destitution</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="lgbtqi" /><span> LGBTQI</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="mentalhealthservices" /><span> Mental Health Services</span></div>
                <div><input onChange={e => this.handleCheckbox(e)} type="checkbox" name="vehicle" value="healthcare" /><span> Healthcare</span></div>
              </div>
            </form>
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

export default EditOrganisation;