import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from './PaperOrg';
import SingleOrganisation from './SingleOrganisation';
import EditOrganisation from './EditOrganisation';
import './index.css';


const styles = theme => ({
  root: {
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
    
  },
  wrapper: {
    maxWidth: 400,
    
  },
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    width: '50%',
  },
});

const OrganisationCard = ({
  org,
  getData,
}) => (
  <Paper label='org-card-info'>
    <EditOrganisation getData={getData} />
    <SingleOrganisation org={org} />
    
    { /*  Conditionally display services and process, if no info provided display  'not provided' in FE */ }
    {org.distance ? <h1 className="distance">{org.distance}</h1> : null}
    { org.org_name ? <h1>{org.org_name}</h1> : <h1 className="not-available"> Add organisation name ...</h1>}
    <h6> Area: {org.area ? org.area : 'Add area   ...'} | Borough: {org.borough ? org.borough : 'Add borough ...'}</h6>
    <div className="org-card-services">

      {org.service? <p> <span className="title"> <img src="https://png.icons8.com/material/17/1abcd4/administrative-tools.png" alt="administrative-tools" className="material-icons org-card-icon" /> </span> {org.service}</p>
      :
      <p> <span className="title"> <img src="https://png.icons8.com/material/17/1abcd4/administrative-tools.png" alt="administrative-tools" className="material-icons org-card-icon" /> </span>Add services ...</p>}

      {org.process ? <p> <span className="title"> <i className="material-icons org-card-icon">access_time</i> </span> {org.process} </p> 
      :
      <p> <span className="title"> <i className="material-icons org-card-icon">access_time</i> </span><span className="not-available"> Add process ... </span></p>}
    </div>
  
  </Paper>
  );

export default withStyles(styles)(OrganisationCard);
