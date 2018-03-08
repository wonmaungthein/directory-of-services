import React, { Component } from 'react';
import OrganisationForm from './OrganisationForm';
import './add-org.css';
import TopNav from '../TopNav';

export default class AddOrganisation extends Component {
  state = {
    name: "",
    nameError: "",
    area: "",
    areaError: "",
    borough: "Highbury and Islington",
    boroughError: "",
    process: "Email, then call",
    processError: "",
    day: "Monday",
    dayError: "",
    telephone: "028 297 4111",
    telephoneError: "",
    email: "",
    emailError: "",
    website: "",
    websiteError: "",
    service: "",
    serviceError: "",
    category: [],
  };

  validate = () => {
    let isError = false;
    const errors = {
      nameError: "",
      areaError: "",
      boroughError: "",
      processError: "",
      dayError: "",
      telephoneError: "",
      emailError: "",
      websiteError: "",
      serviceError: "",
    }
    if (this.state.name.length < 2) {
      isError = true;
      errors.nameError = "The name has to be at least two character"
    }
    if (this.state.areaError.length < 0) {
      isError = true;
      errors.nameError = "The area filed is required"
    }
    if (this.state.boroughError.length < 0) {
      isError = true;
      errors.nameError = "The borough filed is required"
    }
    if (this.state.processError.length < 0) {
      isError = true;
      errors.nameError = "The process filed is required"
    }

    if (this.state.dayError.length < 0) {
      isError = true;
      errors.nameError = "The day field is required"
    }
    if (this.state.telephoneError.length < 10) {
      isError = true;
      errors.nameError = "The telephone has to be at least 10 numbers"
    }
    if (this.state.emailError.length < 0) {
      isError = true;
      errors.nameError = "Invalid email"
    }
    if (this.state.websiteError.length < 0) {
      isError = true;
      errors.nameError = "The website field is required"
    }
    if (this.state.serviceError.length < 0) {
      isError = true;
      errors.nameError = "The service field is required"
    }
    this.setState({
      ...this.state,
      ...errors,
    });
    return isError;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
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
  }

  updateNameField = event => {
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
      <div>
        <TopNav />
        <div className="add-orgonaization">
          <h1>Add new orgonaization</h1>
          <OrganisationForm
            name={this.state.name}
            area={this.state.area}
            borough={this.state.borough}
            process={this.state.process}
            day={this.state.day}
            telephone={this.state.telephone}
            email={this.state.email}
            website={this.state.website}
            service={this.state.service}
            formType="org-content"
            onChange={this.updateNameField}
            onChangeCheckbox={this.handleCheckbox}
          />
          <button className="add-orgonaization-link" onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
        </div>
      </div>
    )
  }
}