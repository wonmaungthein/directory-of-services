import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import helpers from '../../helpers';
import './categories.css';

class Categories extends Component {
  state = {
    categoriesList: true,
  };

  onClickChange = () => {
    this.setState({
      categoriesList: !this.state.categoriesList,
    });
  };

  showListOfcategories = (data) => {
    if (this.state.categoriesList) {
      return (
        <ul>
          {data.sort().map(category =>
            (
              <li>
                <Link to={`/services/${helpers.linkMaker(category)}`}>{helpers.categoryNameMaker(category)}</Link>
              </li>
            )
          )}
        </ul>
      );
    }
  };

  render() {
    const categoriesName = this.props.categoriesName.categories ? this.props.categoriesName.categories : [];
    return (
      <div className="categories">
        <span
          tabIndex={0}
          role="button"
          className="categories-title"
          onClick={this.onClickChange}
          onKeyPress={this.onClickChange}
        >
          Categories
        </span>
        {this.showListOfcategories(categoriesName)}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    categoriesName: state.categoriesList
  }
}

Categories.propTypes = {
  categoriesName: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Categories);
