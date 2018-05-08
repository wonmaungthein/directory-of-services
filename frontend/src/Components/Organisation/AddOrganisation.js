import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrganisationForm from './OrganisationForm';
import addOrganisation from '../../actions/postData';
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
    Services: '',
    Categories: [],
  };

  componentDidMount() {
    const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);
    this.setState({
      notificationSystem: this.refs.savedChanges,
      Categories: [checkedCategory]
    });
  }

  validate = () => {
    let isError = false;
    if (
      this.state.Organisation.length <= 0 ||
      this.state.Area.length <= 0 ||
      this.state.Borough.length <= 0 ||
      this.state.Process.length <= 0 ||
      this.state.Day.length <= 0 ||
      this.state.Tel.length <= 0 ||
      this.state.Email.length <= 0 ||
      this.state.Website.length <= 0 ||
      this.state.Services.length <= 0 ||
      this.state.Categories.length <= 0
    ) {
      isError = true;
    }
    return isError;
  }

  handleSubmit = (e) => {
    // const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);
    e.preventDefault();
    const error = this.validate();
    const Day = this.state.Day.join(",");
    const Categories = this.state.Categories.join(",");

    const data = {
      Organisation: this.state.Organisation,
      Services: this.state.Services,
      Website: this.state.Website,
      Borough: this.state.Borough,
      Process: this.state.Process,
      Email: this.state.Email,
      Area: this.state.Area,
      Tel: this.state.Tel,
      Categories,
      Day,
    }
    if (!error) {
      this.props.addOrganisation(data).then(user => {
        if (user.data.success !== false) {
          this.savedChangesSuccessfully();
          // this.props.history.push(`/services/${checkedCategory}`);
        } else {
          this.unSucessSavedChanges(user.data.message);
        }
      });
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
    } else {
      this.unSucessSavedChanges('You have to fill all fields');
    }

  }

  savedChangesSuccessfully = () => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message: 'Your Changes have been saved successfully',
      level: 'success',
    });
  };

  unSucessSavedChanges = message => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
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
    const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);

    return (
      <div>
        <TopNav addLink="organisations/add" addOrg="Add new organisation" />
        <NotificationSystem ref="savedChanges" />
        <div className="add-orgonaization">
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
            checkedCategory={`${checkedCategory}`}
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

AddOrganisation.propTypes = {
  addOrganisation: PropTypes.func.isRequired
}

export default connect(null, { addOrganisation })(withRouter(props => <AddOrganisation {...props} />));
