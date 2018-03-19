import React from 'react';
import Paper from 'material-ui/Paper';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import './index.css';

const OrganisationCard = (props) => {
  const { org, index } = props;
  return (
    <Paper className="form-card" key={org.id}>
      <EditOrganisation getData={() => this.editSelectedOrganisation(index)} />
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
}

export default OrganisationCard;