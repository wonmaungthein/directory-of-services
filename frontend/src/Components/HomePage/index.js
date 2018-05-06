import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import HomeSearch from './HomeSearch';
import { getCategories, getBoroughs, getAreas } from '../../actions/getApiData';

class HomePage extends Component {

  componentDidMount() {
    this.props.getCategories();
    this.props.getBoroughs();
    this.props.getAreas();
  }

  render() {
    return (
      <div>
        <TopNav homePage />
        <HomeSearch />
      </div>
    )
  }
}

HomePage.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getBoroughs: PropTypes.func.isRequired,
  getAreas: PropTypes.func.isRequired,
}

export default connect(null, { getCategories, getBoroughs, getAreas })(HomePage);
