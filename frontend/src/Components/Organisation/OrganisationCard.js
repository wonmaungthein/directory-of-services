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
    <SingleOrganisation org={org} />
    <div className="single-orgonaization-details">
      <h4>{org.org_name}</h4>
      <h6>
        Area: {org.area} | Borough: {org.borough}
      </h6>
      <div className="health-advice-process">
        <p> - {org.process}</p>
        <p> - {org.email_address}</p>
      </div>
    </div>
  </Paper>
  );

export default OrganisationCard;
