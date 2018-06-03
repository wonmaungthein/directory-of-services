import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import EditOrganisation from '../Organisation/EditOrganisation';
import SingleOrganisation from '../Organisation/SingleOrganisation';
import helpers from '../../helpers';
import OrganisationCard from '../Organisation/OrganisationCard';
import Spinner from '../Spinner';
import './HomePage.css'

class HomeSearch extends Component {
  state = {
    organisations: [],
    editIdx: -1,
    search: ''
  };

  componentWillReceiveProps(newProps) {
    const organisations = newProps.organisations ? newProps.organisations.data : [];
    this.setState({
      organisations
    });
  }

  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
    });
  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  filterData = (orgs) => {
    const { search } = this.state;
    if (search.length > 1) {
      return orgs.filter(org =>
        org.org_name.toLowerCase().includes(search.toLowerCase()) ||
        org.borough.toLowerCase().includes(search.toLowerCase()) ||
        org.project.toLowerCase().includes(search.toLowerCase()) ||
        org.cat_name.toLowerCase().includes(search.toLowerCase()) ||
        org.website.toLowerCase().includes(search.toLowerCase()) ||
        org.area.toLowerCase().includes(search.toLowerCase()) ||
        org.email_address.toLowerCase().includes(search.toLowerCase()) ||
        org.telephone.toLowerCase().includes(search.toLowerCase()) ||
        org.service.toLowerCase().includes(search.toLowerCase()) ||
        org.process.toLowerCase().includes(search.toLowerCase())
      ).sort(helpers.sortArrObj)
    }
    return [];
  }

  render() {
    const { editIdx, organisations } = this.state;
    if (organisations.length <= 0) {
      return <Spinner />
    }
    if (!this.props.match.url.includes('/users')) {
      return (
        <div>
          <Grid container className="organisation-page" spacing={24}>
            <Grid item xs={12}>
              <i className="material-icons search-con">search</i>
              <TextField
                id="search"
                label="Search"
                className="search-field"
                value={this.state.search}
                onChange={this.handleSearchChange}
                margin="normal"
              />
            </Grid>
            {this.filterData(organisations).map((org, index) => {
              const currentlyEditing = editIdx === index;
              return currentlyEditing ? (
                <Fragment>
                  <EditOrganisation
                    stopEditing={this.stopEditing}
                    editOrgData={org}
                    show
                  />
                  <SingleOrganisation
                    stopEditing={this.stopEditing}
                    handleShawDetails
                    org={org}
                  />
                </Fragment>
              ) : (
                <Grid item xs={12} sm={6} key={org.id}>
                  <OrganisationCard
                    getData={() => this.editSelectedOrganisation(index)}
                    org={org}
                    index={index}
                  />
                </Grid>
                );
            })}
          </Grid>
        </div >
      );
    }
    return null;
  }
}

export default withRouter(props => <HomeSearch {...props} />)

