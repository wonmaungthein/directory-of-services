import React from 'react';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import './organisation.css'

const OrganisationCard = () => (
  <div className="single-orgonaization">
    <div className="form-card">
      <EditOrganisation />
      <SingleOrganisation />
      <div className="single-orgonaization-details">
        <h4>Haringey Migrant Service</h4>
        <h6>Area: North | Borough: Haringey</h6>
        <div className="health-advice-process">
          <p> - Health advice</p>
          <p> - Help accessing NHS</p>
        </div>
      </div>
    </div>
    <div className="form-card">
      <EditOrganisation />
      <SingleOrganisation />
      <div className="single-orgonaization-details">
        <h4>Haringey Migrant Service</h4>
        <h6>Area: North | Borough: Haringey</h6>
        <div className="health-advice-process">
          <p> - Health advice</p>
          <p> - Help accessing NHS</p>
        </div>
      </div>
    </div>
  </div>
)

export default OrganisationCard