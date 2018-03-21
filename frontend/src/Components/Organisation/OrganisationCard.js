import React from 'react';
import Paper from 'material-ui/Paper';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import './index.css';

const OrganisationCard = ({ org, Organisation, Area, Services, Process, getData }) =>
  (
    <Paper className="form-card">
      <EditOrganisation getData={getData} />
      <SingleOrganisation editOrgData={org} />
      <div className="single-orgonaization-details">
        <h4>{Organisation}</h4>
        <h6>
          Area: {Area} | Borough: {org.Borough}
        </h6>
        <div className="health-advice-process">
          <p> - {Services}</p>
          <p> - {Process}</p>
        </div>
      </div>
    </Paper>
  );

export default OrganisationCard;