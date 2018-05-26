import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import helpers from '../../helpers';
import categoriesData from '../../Data/Categories.json';
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
          {data.sort().map((category) =>
            (
              <li key={category + 1}>
                <Link to={`/services/${helpers.linkMaker(category)}`}>{helpers.categoryNameMaker(category)}</Link>
              </li>
            )
          )}
        </ul>
      );
    }
  };

  render() {
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
        {this.showListOfcategories(categoriesData)}
      </div>
    );
  }
}

export default Categories;
