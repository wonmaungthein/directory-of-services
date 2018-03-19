import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategoriesData from '../../Data/Categories.json';
import helpers from '../../helpers';
import './categories.css';

export default class Categories extends Component {
  state = {
    categoriesList: true,
  };

  onClickChange = () => {
    this.setState({
      categoriesList: !this.state.categoriesList,
    });
  };

  showListOfcategories = () => {
    if (this.state.categoriesList) {
      return (
        <ul>
          {CategoriesData.map(category =>
            (
              <li>
                <Link to={`/services/${helpers.linkMaker(category)}`}>{category}</Link>
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
        {this.showListOfcategories()}
      </div>
    );
  }
}
