import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { withRouter } from 'react-router-dom';
import OrganisationForm from './OrganisationForm';
import './add-org.css';
import TopNav from '../TopNav';
import helpers from '../../helpers'

class AddOrganisation extends Component {
  state = {
    notificationSystem: null,
    Organisation: '',
    Area: '',
    Borough: '',
    Process: '',
    Day: [''],
    Tel: '',
    Email: '',
    Website: '',
    Services: [],
    Categories: [],
  };

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges,
    });
  }

  handleSubmit = (e) => {
    const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);
    e.preventDefault();
    this.savedChangesSuccessfully();
    this.setState({
      Organisation: '',
      Area: '',
      Borough: '',
      Process: '',
      Day: [],
      Tel: '',
      Email: '',
      Website: '',
      Services: [],
      Categories: [],
    });
    this.props.history.push(`/services/${checkedCategory}`);
  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  };

  unSucessSavedChanges = event => {
    event.preventDefault();
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message: 'Your Changes have not been saved successfully',
      level: 'error',
    });
  };

  handleFieldUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckBox = event => {
    const listOfCategories = this.state.Categories;
    listOfCategories.push(event.target.value);
    this.setState({
      [event.target.name]: event.target.checked,
      Categories: listOfCategories,
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
          <button
            className="add-orgonaization-link"
            onClick={event => this.handleSubmit(event)}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(props => <AddOrganisation {...props} />);
