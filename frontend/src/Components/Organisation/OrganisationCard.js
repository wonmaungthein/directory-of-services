import React from 'react';
import Paper from 'material-ui/Paper';
import SingleOrganisation from './SingleOrganisation';
import EditOrganisation from './EditOrganisation';
import './index.css';

const OrganisationCard = ({
  org,
  getData,
}) => (
  <Paper className="form-card">
    <EditOrganisation getData={getData} />    
    <SingleOrganisation editOrgData={org} />
    <div className="single-orgonaization-details">
      <h4>{org.Organisation}</h4>
      <h6>
        Area: {org.Area} | Borough: {org.Borough}
      </h6>
      <div className="health-advice-process">
        <p> - {org.Services}</p>
        <p> - {org.Process}</p>
      </div>
    </div>
  </Paper>
);

export default OrganisationCard;
