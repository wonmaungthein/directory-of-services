import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import OrganisationForm from './OrganisationForm';
import './add-org.css';
import TopNav from '../TopNav';

export default class AddOrganisation extends Component {
  state = {
    notificationSystem: null,
    checked: false,
    Organisation: "",
    Area: "",
    Borough: "Highbury and Islington",
    Process: "Email, then call",
    Day: ["Monday"],
    Tel: "028 297 4111",
    Email: "",
    Website: "",
    Services: [],
    Categories: [],
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.savedChangesSuccessfully();
    this.setState({
      Organisation: "",
      Area: "",
      Borough: "",
      Process: "",
      Day: [],
      Tel: "",
      Email: "",
      Website: "",
      Services: [],
      Categories: [],
    })
    console.log(this.state.Categories)
  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  }

  unSucessSavedChanges = (event) => {
    event.preventDefault();
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'Your Changes have not been saved successfully',
      level: 'error',
    });
  }

  handleFieldUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleCheckBox = event => {
    const categoriesList = categories.push(event.target.value);
    this.setState({
      [event.target.name]: event.target.checked,
      Categories: categoriesList;
    });
  };

  handleMulitySelectChange = event => {
    this.setState({ Day: event.target.value });
  };

  render() {
    return (
      <div>
        <TopNav addLink="organisations/add" />
        <NotificationSystem ref="savedChanges" />
        <div className="add-orgonaization">
          <h1>Add new organisation</h1>
          <OrganisationForm
            name={this.state.Organisation}
            area={this.state.Area}
            borough={this.state.Borough}
            process={this.state.Process}
            day={this.state.Day}
            telephone={this.state.Tel}
            email={this.state.Email}
            website={this.state.Website}
            service={this.state.Services}
            handleCheckBox={this.handleCheckBox}
            formType="org-content"
            handleMulitySelectChange={this.handleMulitySelectChange}
            onChange={this.handleFieldUpdate}
          />
          <button className="add-orgonaization-link" onClick={event => this.handleSubmit(event)}>SAVE CHANGES</button>
        </div>
      </div>
    )
  }
}