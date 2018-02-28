import React, { Component } from 'react';
import './organisation.css';
import OrganisationForm from './OrganisationForm'
export default class AddOrganisationForm extends Component {
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
      category: [],
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
      category: []
    })
    console.log(updateOrgonaization)
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
              organisationName="organisationName"
              organisationNameValue={this.state.organisationName}

              area="area"
              areaValue={this.state.area}

              borough="borough"
              boroughValue={this.state.borough}              

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

              service="service"
              serviceValue={this.state.service}

              addOrgtitle="add-org-title"
              addCategoriesCheckbox="add-categories-checkbox"

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
            <button className="add-orgonaization-link" onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
          </div>
        )
    }
}