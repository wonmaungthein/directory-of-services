import React, { Component } from 'react';
import OrganisationForm from './OrganisationForm';
import './organisation.css';

export default class AddOrganisationForm extends Component {
  state = {
    name: "",
    area: "",
    borough: "Highbury and Islington",
    process: "Email, then call",
    day: "Monday",
    telephone: "028 297 4111",
    email: "",
    website: "",
    service: "",
    category: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      area: "",
      borough: "",
      name: "",
      process: "",
      day: "",
      telephone: "",
      email: "",
      website: "",
      service: "",
      category: []
    })
  }

  updateField = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
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
      <div className="add-orgonaization">
        <h1>Add new orgonaization</h1>
        <OrganisationForm
          organisationNameValue={this.state.name}
          areaValue={this.state.area}
          boroughValue={this.state.borough}              
          processValue={this.state.process}
          dayValue={this.state.day}
          telephoneValue={this.state.telephone}
          emailValue={this.state.email}
          websiteValue={this.state.website}
          serviceValue={this.state.service}

          addContent="org-content"
          onChange={this.updateField}
          onChangeCheckbox={this.handleCheckbox}
        />
        <button className="add-orgonaization-link" onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
      </div>
    )
  }
}