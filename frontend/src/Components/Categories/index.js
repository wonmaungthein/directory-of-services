import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './categories.css';

export default class index extends Component {
  state = {
    categoriesList: false,
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
          <li>
            <Link to="/debt">Debt</Link>
          </li>
          <li>
            <Link to="/ypfamilies">YP Families</Link>
          </li>
          <li>
            <Link to="/womendv">Women DV</Link>
          </li>
          <li>
            <Link to="/trafficking">Trafficking</Link>
          </li>
          <li>
            <Link to="/destitution">Destitution</Link>
          </li>
          <li>
            <Link to="/lgbtqi">LGBTQI</Link>
          </li>
          <li>
            <Link to="/mentalhealthservices">Mental Health Services</Link>
          </li>
          <li>
            <Link to="/healthcare">Healthcare</Link>
          </li>
          <li>
            <Link to="/womendv">Women DV</Link>
          </li>
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
