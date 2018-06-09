import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import HomeSearch from './HomeSearch';
import { getBoroughs, getAreas, getOrganisationsList, getListOfUsers } from '../../actions/getApiData';

class HomePage extends Component {

  componentDidMount() {
    this.props.getBoroughs();
    this.props.getAreas();
    this.props.getOrganisationsList();
    this.props.getListOfUsers();
  }

  render() {
    const organisations = this.props.organisations ? this.props.organisations.areas : [];
    return (
      <div>
        <TopNav homePage />
        <HomeSearch organisations={organisations}  />
      </div>
    )
  }
}

HomePage.propTypes = {
  getBoroughs: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
  getOrganisationsList: PropTypes.func.isRequired,
  getListOfUsers: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    organisations: state.organisationsList,
  }
}

export default connect(mapStateToProps, { getBoroughs, getAreas, getOrganisationsList, getListOfUsers })(HomePage);
