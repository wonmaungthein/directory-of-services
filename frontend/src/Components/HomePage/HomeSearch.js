import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import EditOrganisation from '../Organisation/EditOrganisation';
import SingleOrganisation from '../Organisation/SingleOrganisation';
import helpers from '../../helpers';
import OrganisationCard from '../Organisation/OrganisationCard';
import Spinner from '../Spinner';
import './HomePage.css'

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class HomeSearch extends React.Component {
  state = {
    value: '',
    suggestions: [],
    organisations: [],
    editIdx: -1,
    search: ''
  };

  componentWillReceiveProps(newProps) {
    const organisations = newProps.organisations ? newProps.organisations.data : [];
    this.setState({
      organisations: helpers.removeOrgDuplication(organisations)
    });
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: helpers.getMainSearchSuggestions(value, this.state.organisations),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
    });

  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  updateSearchData = () => {
    this.setState({ search: this.state.value })
  }

  clearSearchField = () => {
    this.setState({ search: '', value: '' })
  }

  filterData = (orgs) => {
    const { search } = this.state;
    if (search) {
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
    const { classes } = this.props;
    if (organisations.length <= 0) {
      return <Spinner />
    }
    if (!this.props.match.url.includes('/users')) {
      return (
        <div>
          <Grid container className="organisation-page" spacing={24}>
            <Grid item xs={12} className="search-input">
              <Autosuggest
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion,
                }}
                renderInputComponent={helpers.renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={helpers.renderSuggestionsContainer}
                getSuggestionValue={helpers.getMainSearchSuggestionValue}
                renderSuggestion={helpers.renderMainSearchSuggestion}
                inputProps={{
                  classes,
                  placeholder: 'Search',
                  value: this.state.value,
                  onChange: this.handleChange,
                }}
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

HomeSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(props => <HomeSearch {...props} />));
