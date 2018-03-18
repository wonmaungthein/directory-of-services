import React, { Component, Fragment } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import Search from './Search';
import TopNav from '../TopNav';
import helpers from '../../helpers';
import orgData from '../../Data/json/Benefits.json'
import './index.css';

class OrganisationCard extends Component {

  state = {
    organisations: orgData.data,
    editIdx: -1,
  }

  editSelectedOrganisation = (idex) => (
    this.setState({
      editIdx: idex,
    })
  );

  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  render() {
    const { editIdx } = this.state;
    const { params } = this.props.match;
    const service =
      params && params.service
        ? helpers.capitaliseAndPrettify(params.service)
        : null;
    return (
      <div>
        <TopNav title={service} addLink="organisations/add" titleLink={`services/${service}`} />
        <Search />
        <Grid container className="organisation-page" spacing={24}>
          {this.state.organisations.map((org, index) => {
            const currentlyEditing = editIdx === index;
            return currentlyEditing ? (
              <Fragment>
                <EditOrganisation stopEditing={this.stopEditing} handleClichOpen={true} editOrgData={org} />
                <SingleOrganisation stopEditing={this.stopEditing} handleShawDetails={true} editOrgData={org} />
              </Fragment>) : (
                <Grid item xs={12} sm={6}>
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
                </Grid>
              )
          })}
        </Grid>
      </div>
    );
  }
};

export default OrganisationCard;
