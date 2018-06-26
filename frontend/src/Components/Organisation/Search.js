import React from 'react';
import Button from 'material-ui/Button';
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
import BoroughData from '../../Data/Boroughs.json';
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
  { day: 'Mon-Fri' },
  { day: 'All' },
]

const boroughs = BoroughData.map(borough => borough.borough).filter((elem, index, self) =>
  index === self.indexOf(elem)
).sort();

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
          <span>
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
                placeholder: 'Enter postcode',
                name: 'postCode',
                value: this.props.postCode,
                onChange: this.props.handlePostCodeChange,
              }}
            />
            <span className="postcode-error">{this.props.postcodeError}</span>
          </span>
          <Button variant="fab" mini color="secondary" onClick={this.props.handlePostSearch} aria-label="add" className="search-button">
            <i className="material-icons">search</i>
          </Button>
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
              {boroughs.map(borough => <MenuItem value={borough}>{borough}</MenuItem>)}
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
