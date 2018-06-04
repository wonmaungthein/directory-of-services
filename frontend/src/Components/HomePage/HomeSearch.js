import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
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
    search: '',
    searchValue: ''
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
    e.preventDefault()
    this.setState({ search: e.target.value })
  }

  updateSearchData = () => {
    this.setState({searchValue: this.state.search})
  }

  clearSearchField = () => {
    this.setState({ searchValue: '' })
  }

  filterData = (orgs) => {
    const { searchValue } = this.state;
    if (searchValue.length > 1) {
      return orgs.filter(org =>
        org.org_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.borough.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.project.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.cat_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.website.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.area.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.email_address.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.telephone.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.service.toLowerCase().includes(searchValue.toLowerCase()) ||
        org.process.toLowerCase().includes(searchValue.toLowerCase())
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
              <Button
                onClick={this.updateSearchData}
                variant="raised"
                color="primary"
                size="small"
              >
                Search
              </Button>
              <Button
                onClick={this.clearSearchField}
                variant="raised"
                size="small"
                className="clear-search"
                color="secondary"
              >
                Clear Search
              </Button>
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

