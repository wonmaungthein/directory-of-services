import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Autosuggest from 'react-autosuggest';
import { withStyles } from 'material-ui/styles';
import 'react-select/dist/react-select.css';
import helpers from '../../helpers';
import searchStyle from './searchStyle';
import './search.css';

const organisations = [
  { postCode: 'SE8 4PA' },
  { postCode: 'H2 2TH' },
  { postCode: 'H2 3TH' },
];
const days = [
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' },
  { day: 'Sunday' },
]

const boroughs = [
  { borough: "Across London" },
  { borough: "All" },
  { borough: "Barking" },
  { borough: "Dagenham" },
  { borough: "Barnet" },
  { borough: "Bexley" },
  { borough: "Bow" },
  { borough: "Brent" },
  { borough: "Bristol" },
  { borough: "Bromley" },
  { borough: "Camden" },
  { borough: "Camden (Holborn)" },
  { borough: "Canterbury City Council" },
  { borough: "Central London" },
  { borough: "City of London" },
  { borough: "Croydon" },
  { borough: "Croydon College" },
  { borough: "Dartford Borough Council" },
  { borough: "Deptford" },
  { borough: "Dulwich" },
  { borough: "Ealing" },
  { borough: "Enfield" },
  { borough: "Essex/East London" },
  { borough: "Farringdon/ Battersea" },
  { borough: "Greenwich" },
  { borough: "Hackney" },
  { borough: "Haringey" },
  { borough: "Hounslow" },
  { borough: "Islington" },
  { borough: "Islington (Finsbury Park)" },
  { borough: "Islington (Holloway)" },
  { borough: "Kensington and Chelsea" },
  { borough: "Kent/London and Surrey/Sussex" },
  { borough: "Kilburn" },
  { borough: "Ladbroke Grove" },
  { borough: "Lambeth" },
  { borough: "Lewisham" },
  { borough: "London" },
  { borough: "London and Surrey" },
  { borough: "London/Essex/South East" },
  { borough: "National" },
  { borough: "Nationwide" },
  { borough: "Newham" },
  { borough: "Notting Hill" },
  { borough: "Old Street" },
  { borough: "Pan London" },
  { borough: "Redbridge" },
  { borough: "SE London" },
  { borough: "South East London" },
  { borough: "South East London boroughs" },
  { borough: "Southwark" },
  { borough: "Sutton" },
  { borough: "Swale Borough Council" },
  { borough: "Hamlets" },
  { borough: "Tower" },
  { borough: "UK" },
  { borough: "UK wide" },
  { borough: "Wandsworth" },
  { borough: "Wapping" },
  { borough: "Westminster" },
  { borough: "Wimbledon" }
].sort();

class Search extends React.Component {
  state = {
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

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={24} className="org-search">
        <Grid item md={5} xs={12} className="post-code">
          <h4>
            <i className="material-icons">search</i>
          </h4>
          <Autosuggest
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            className="post-code-suggesition"
            renderInputComponent={helpers.renderInput}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={helpers.renderSuggestionsContainer}
            getSuggestionValue={helpers.getSuggestionValue}
            renderSuggestion={helpers.renderSuggestion}
            inputProps={{
              classes,
              placeholder: 'Search Near',
              name: 'postCode',
              value: this.props.postCode,
              onChange: this.props.handlePostCodeChange,
            }}
          />
        </Grid>
        <Grid item md={4} xs={12} className="day">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple">Day</InputLabel>
            <Select
              className="select-field-container day-small-screen"
              value={this.props.day}
              onChange={this.props.handleSelectedDay}
              inputProps={{
                name: 'day',
                id: 'day',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {days.map(day => <MenuItem value={day.day}>{day.day}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3} xs={12} className="service">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="borough">Select Borough</InputLabel>
            <Select
              className="select-field-container"
              value={this.props.borough}
              onChange={this.props.handleSelectedBorough}
              inputProps={{
                name: 'borough',
                id: 'borough',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {boroughs.map(borough => <MenuItem value={borough.borough}>{borough.borough}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(searchStyle.styles)(Search);
