import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from "react-router-dom";
import './categories.css'

const Categories=() => (
  <div>
    <List className="categories">
      <ListItem
        className="category"
        primaryText="Categories"
        initiallyOpen={false}
        nestedItems={[
          <Link to="/debt">Debt</Link>,
          <Link to="/ypfamilies">YP Families</Link>,
          <Link to="/womendv">Women DV</Link>,
          <Link to="/trafficking">Trafficking</Link>,
          <Link to="/destitution">Destitution</Link>,
          <Link to="/lgbtqi">LGBTQI</Link>,
          <Link to="/mentalhealthservices">Mental Health Services</Link>,
          <Link to="/healthcare">Healthcare</Link>,
          <Link to="/womendv">Women DV</Link>
        ]}
      />
    </List>

  </div>
);
export default Categories