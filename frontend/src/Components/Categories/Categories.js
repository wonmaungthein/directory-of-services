import React from "react";

import { Link } from "react-router-dom";
import "./categories.css";

const Categories = () => (
  <div className="categories">
    <Link to="/debt">Debt</Link>,
    <Link to="/ypfamilies">YP Families</Link>,
    <Link to="/womendv">Women DV</Link>,
    <Link to="/trafficking">Trafficking</Link>,
    <Link to="/destitution">Destitution</Link>,
    <Link to="/lgbtqi">LGBTQI</Link>,
    <Link to="/mentalhealthservices">Mental Health Services</Link>,
    <Link to="/healthcare">Healthcare</Link>,
    <Link to="/womendv">Women DV</Link>
  </div>
);

export default Categories;
