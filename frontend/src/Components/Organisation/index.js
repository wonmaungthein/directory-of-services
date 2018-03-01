import React from 'react';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import './organisation.css';
import orgData from './org_data';

const OrganisationCard = () => (
  <div className="single-orgonaization">
    {orgData.map(org => {
      return (
        <div className="form-card" key={org.id}>
          <EditOrganisation />
          <SingleOrganisation />
          <div className="single-orgonaization-details">
            <h4>{org.org_name}</h4>
            <h6>Area: {org.area} | Borough: {org.borough}</h6>
            <div className="health-advice-process">
              <p> - Health advice</p>
              <p> - {org.advice}</p>
            </div>
          </div>
        </div>
      );
    })}  
  </div>
)

export default OrganisationCard