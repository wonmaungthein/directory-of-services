import React from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import Search from './Search';
import orgData from './org_data';
import TopNav from '../TopNav';
import helpers from '../../helpers';

import './index.css';

const OrganisationCard = props => {
  const { params } = props.match;
  const service =
    params && params.service
      ? helpers.capitaliseAndPrettify(params.service)
      : null;

  return (
    <div>
      <TopNav service={service} />
      <Search />
      <Grid container spacing={24}>
        {orgData.map(org => (
          <Grid item xs={12} sm={6}>
            <Paper className="form-card" key={org.id}>
              <EditOrganisation />
              <SingleOrganisation />
              <div className="single-orgonaization-details">
                <h4>{service} Service</h4>
                <h6>
                  Area: {org.area} | Borough: {org.borough}
                </h6>
                <div className="health-advice-process">
                  <p> - {service} advice</p>
                  <p> - Help with {service}</p>
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrganisationCard;
