import React from 'react';
import TextField from 'material-ui/TextField';
import parse from 'autosuggest-highlight/parse';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import Chip from 'material-ui/Chip';
import Select from 'react-select';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import CancelIcon from 'material-ui-icons/Cancel';
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp';
import ClearIcon from 'material-ui-icons/Clear';
import Typography from 'material-ui/Typography';
import Option from './Components/Organisation/Option';

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
        {parts.map(
          (part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            ),
        )}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(orgainsation) {
  return `${orgainsation.address}, ${orgainsation.postCode}`;
}
function getSuggestions(value, organisations) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : organisations.filter(organisation => {
        const keep =
          count < 5 &&
          organisation.postCode.toLowerCase().slice(0, inputLength) ===
            inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>No results found</Typography>}
      arrowRenderer={arrowProps =>
        arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }
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

function capitaliseAndPrettify(name) {
  return name
    ? name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : null;
}

function linkMaker(name) {
  return name
    ? name
        .replace(' ', '')
        .replace('/', '')
        .replace(' & ', '')
        .replace('/', '')
        .replace(' ', '')
        .replace(' ', '')
        .replace(/\b\w/g, l => l.toUpperCase())
    : null;
}
function reformatCategoryName(name) {
  return name
    ? name.replace('/services/', '').replace(/\b\w/g, l => l.toUpperCase())
    : null;
}

function categoryNameMaker(name) {
  return name
    ? name
        .replace('/', '')
        .replace('services/', '')
        .replace('/add', '')
        .replace(/\b\w/g, l => l.toUpperCase())
    : null;
}

function addSpace(cate, cateTitle) {
  return cate.map((category, index) => {
    if (linkMaker(category) === cateTitle) {
      return cateTitle = cate[index].replace('/', ' ').replace('/', ' ')
    }
  });
}

export default {
  renderInput,
  renderSuggestion,
  renderSuggestionsContainer,
  getSuggestionValue,
  getSuggestions,
  SelectWrapped,
  capitaliseAndPrettify,
  linkMaker,
  reformatCategoryName,
  categoryNameMaker,
  addSpace
};
