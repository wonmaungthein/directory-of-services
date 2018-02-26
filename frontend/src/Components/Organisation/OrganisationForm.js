import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import './organisation.css'

export default class OrganisationForm extends Component {
  state = {
      organisationName: "",
      area: "",
      borough: "Highbury and Islington",
      process: "Email, then call",
      day: "Monday",
      telephone: "028 297 4111",
      email: "",
      website: "",
      service: "",
      category: false
    };

  handleSubmit = (e) => {
    e.preventDefault();
    const updateOrgonaization = {
      area: this.state.area,
      borough: this.state.borough,
      organisationName: this.state.organisationName,
      process: this.state.process,
      day: this.state.day,
      telephone: this.state.telephone,
      email: this.state.email,
      website: this.state.website,
      service: this.state.service,
      category: this.state.category
    }
    this.setState({
      area: "",
      borough: "",
      organisationName: "",
      process: "",
      day: "",
      telephone: "",
      email: "",
      website: "",
      service: "",
      category: ""
    })
  }

  updateField = event => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  handleCheckbox = e => {
    this.setState({
      category: e.target.value
    })
  }

    render() {
        return (
          <div className="add-orgonaization">
            <h1>Add new orgonaization</h1>
            <form>
              <div className="form-first-row">
                <TextField
                  className="first-field"    
                  
                  label="Organisation name"
                  name="organisationName"
                  value={this.state.organisationName}
                  onChange={this.updateField}
                />
                <TextField
                  className="second-field"    
                  
                  label="Area"
                  name="area"
                  value={this.state.area}
                  onChange={this.updateField}
                />
                <TextField
                  className="third-field"    
                  label="Borough"
                  name="borough"
                  value={this.state.borough}
                  onChange={this.updateField}
                />
              </div>
              <div className="form-second-row">
                <TextField
                  className="first-field"
                  label="Process"
                  name="process"
                  value={this.state.process}
                  onChange={this.updateField}
                />
                <TextField
                  className="second-field"
                  label="Day"
                  name="day"
                  value={this.state.day}
                  onChange={this.updateField}
                />
                <TextField
                  className="third-field"
                  label="Telephone"
                  name="telephone"
                  value={this.state.telephone}
                  onChange={this.updateField}
                />
              </div>
              <div className="add-email-website">
                <TextField
                  label="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.updateField}
                />
                <TextField
                  label="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.updateField}
                />
              </div>
              <div className="form-third-row">
                <TextField
                  multiline
                  rows="4"
                  label="Service"
                  fullWidth
                  name="service"
                  value={this.state.service}
                  onChange={this.updateField}
                />
              </div>
              <div className="add-category">
                <span className="title">Categories</span>
                <div className="add-categories-checkbox">
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
              </div>
              <button className="add-orgonaization-link"onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
            </form>
          </div>
        )
    }
}