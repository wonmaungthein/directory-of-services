import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {withStyles} from 'material-ui/styles';
import {withRouter} from 'react-router-dom';
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
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

class HomeSearch extends React.Component {
  state = {
    value: '',
    suggestions: [],
    organisations: [],
    editIdx: -1,
    search: '',
    isHidden: true,
  };

  componentWillReceiveProps(newProps) {
    const organisations = newProps.organisations
      ? newProps.organisations.data
      : [];
    this.setState({organisations: organisations});
  }

  // allow user to press enter key for search
  handleKeyUp = (e) => {
    if (e.charCode === 13 || e.key === 'Enter') {
      this.updateSearchData();
    }
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: helpers.getMainSearchSuggestions(value, this.state.organisations)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({suggestions: []});
  };

  handleChange = (event, {newValue}) => {
    this.setState({value: newValue, isHidden: false,});
  };

  editSelectedOrganisation = idex => this.setState({editIdx: idex});

  stopEditing = () => {
    this.setState({editIdx: -1});
  };

  updateSearchData = () => {
    this.setState({search: this.state.value, isHidden: true, })
  }

  // clear input value 
  clearSearchField = () => {
    this.setState({ value: '', isHidden: true,})
  }

  filterData = (orgs) => {
    const {search} = this.state;
    if (search) {
      return orgs.filter(org => org.org_name.toLowerCase().includes(search.toLowerCase()) || org.borough.toLowerCase().includes(search.toLowerCase())
       // return branches which service match or part of search 
      || search.toLowerCase().includes(org.service.toLowerCase()) 
      // return all branches which provide service on that day
      || org.service_days.toLowerCase().includes(search.toLowerCase())
      // return all branches if search match cat_name
      || org.cat_name.toLowerCase().includes(search.toLowerCase())
      // return all branches if search tag match 
      || org.tag.toLowerCase().includes(search.toLowerCase())
      // return all branches if search tag match
      || org.area.toLowerCase().includes(search.toLowerCase())
      )
      .sort(helpers.sortArrObj)
    }
    return [];
  }

  render() {
    const {editIdx, organisations} = this.state;
    const {classes} = this.props;
    if (organisations.length <= 0) {
      return <Spinner />
    }
    if (!this.props.match.url.includes('/users')) {
      return (
        <div>
          <Grid container className="organisation-page" spacing={24}>
            <Grid item xs={12} className="search-input">
              <div className="search-text">
                <Autosuggest
                  theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
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
                  onKeyUp: this.handleKeyUp
                }} 
                />
                <button
                  variant="raised"
                  size="small"
                  color="secondary"
                  className={this.state.isHidden ? 'hidden' : 'clear-search'}
                  onClick={this.clearSearchField}
                >
                  <i
                    className="material-icons"
                    size="small"
                    variant="raised"
                  >
                    close
                  </i>
                </button>
              </div>
              <Button
                onClick={this.updateSearchData}
                variant="raised"
                color="primary"
                size="small"
                className="btn-search"
              >
                Search
              </Button>
            </Grid>
            {this
              .filterData(organisations)
              .map((org, index) => {
                const currentlyEditing = editIdx === index;
                return currentlyEditing
                  ? (
                    <Fragment>
                      <EditOrganisation stopEditing={this.stopEditing} editOrgData={org} show />
                      <SingleOrganisation stopEditing={this.stopEditing} handleShawDetails org={org} />
                    </Fragment>
                  )
                  : (
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(props => <HomeSearch {...props} />));










