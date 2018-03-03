import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import 'react-select/dist/react-select.css';
import helpers from '../../helpers'
import searchStyle from './searchStyle';
import './search.css'

const organisations = [
  { postCode: 'H2 1TH', address: 'Bermondsey', day: 'Monday' },
  { postCode: 'H2 2TH', address: '2 Bermondsey', day: 'Tuesday' },
  { postCode: 'H2 3TH', address: '3 Bermondsey', day: 'Wednesday' },
];
const days = [
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
].map(organisation => ({
  value: organisation.day,
  label: organisation.day,
}));

class Search extends React.Component {
  state = {
    postCode: '',
    single: null,
    service: 'Health',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: helpers.getSuggestions(value, organisations),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handlePostCodeChange = (event, { newValue }) => {
    this.setState({
      postCode: newValue,
    });
  };

  handleChangeSingle = single => {
    this.setState({
      single,
    });
  };

  handleServiceChange = e => {
    this.setState({
      service: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { single } = this.state;
    return (
      <div className="org-search">
        <div className="post-code">
          <h4>Search near:</h4>  
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
            getSuggestionValue={helpers.getSuggestionValue}
            renderSuggestion={helpers.renderSuggestion}
            inputProps={{
              classes,
              placeholder: 'Search a country',
              name: 'postCode',
              value: this.state.postCode,
              onChange: this.handlePostCodeChange,
            }}
          />
        </div>
        <div className="day">
          <h4>Day</h4>
          <div className={classes.root}>
            <Input
              fullWidth
              inputComponent={helpers.SelectWrapped}
              inputProps={{
                classes,
                value: single,
                onChange: this.handleChangeSingle,
                placeholder: 'select-day',
                instanceId: 'select-day',
                id: 'select-day',
                name: 'select-day',
                simpleValue: true,
                options: days,
              }}
            />
          </div>
        </div>
        <div className="service">
          <h4>Service</h4>
          <TextField
            name='service'
            value={this.state.service}
            onChange={this.handleServiceChange}
          />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(searchStyle.styles)(Search);