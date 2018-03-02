import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import CancelIcon from 'material-ui-icons/Cancel';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import searchStyle from './searchStyle';

const organisations = [
  { postCode: 'H2 1TH', address: 'Bermondsey', day: 'Monday' },
  { postCode: 'H2 2TH', address: '2 Bermondsey', day: 'Tuesday' },
  { postCode: 'H2 3TH', address: '3 Bermondsey', day: 'Wednesday' },
];
const days = [
  { postCode: 'H2 1TH', address: 'Bermondsey', day: 'Monday' },
  { postCode: 'H2 2TH', address: '2 Bermondsey', day: 'Tuesday' },
  { postCode: 'H2 3TH', address: '3 Bermondsey', day: 'Wednesday' },
].map(organisation => ({ //=== organisation by day =========
  value: organisation.day,
  label: organisation.day,
}));

//========== Auto Compelet Search Field
function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;
  return (
    <TextField
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(organisation, { query, isHighlighted }) {
  const matches = match(organisation.postCode, query);
  const parts = parse(organisation.postCode, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}
//========== Auto Compelet Search Warpper
function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}
//========== Auto Compelet Search Returned Value
function getSuggestionValue(orgainsation) {
  return `${orgainsation.address}, ${orgainsation.postCode}`;
}
//========== Auto Compelet Search Filttring the Organisation
function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : organisations.filter(organisation => {
      const keep =
        count < 5 && organisation.postCode.toLowerCase().slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}
//###################################
//============ Select Field =========

//========= Selected List ===========//
class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}
//========== Selected Wrapper ============//
function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}
//####################################
//========== Search Component ========
class Search extends React.Component {
  state = {
    postCode: '',
    single: null,
    service: 'Health',
    suggestions: [],
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
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

  handleChange = e => {
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
            renderInputComponent={renderInput}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
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
              inputComponent={SelectWrapped}
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
            onChange={this.handleChange}
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