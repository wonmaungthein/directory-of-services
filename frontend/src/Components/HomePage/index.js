import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import HomeSearch from './HomeSearch';
import { getOrganisationsList, getListOfUsers } from '../../actions/getApiData';

class HomePage extends Component {

  componentDidMount() {
    this.props.getOrganisationsList();
    this.props.getListOfUsers();
  }

  render() {
    const organisations = this.props.organisations ? this.props.organisations.areas : [];
    const role = this.props.user.role ? this.props.user.role : '';
    return (
      <div>
        <TopNav homePage />
        <HomeSearch organisations={organisations} role={role} />
      </div>
    )
  }
}

HomePage.propTypes = {
  getOrganisationsList: PropTypes.func.isRequired,
  getListOfUsers: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    organisations: state.organisationsList,
    user: state.loginAuth.user
  }
}

export default connect(mapStateToProps, { getOrganisationsList, getListOfUsers })(HomePage);
