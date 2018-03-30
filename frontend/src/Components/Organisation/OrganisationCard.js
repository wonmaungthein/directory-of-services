import React from 'react';
import Paper from 'material-ui/Paper';
import SingleOrganisation from './SingleOrganisation';
import Notification from '../Users/Notification';
import './index.css';

const OrganisationCard = ({
  org,
  Organisation,
  Area,
  Services,
  Process,
  deleteOrganisation,
}) => (
  <Paper className="form-card">
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
    <Notification
      organisation={Organisation}
      removeHandler={deleteOrganisation}
    />
  </Paper>
);

export default OrganisationCard;
