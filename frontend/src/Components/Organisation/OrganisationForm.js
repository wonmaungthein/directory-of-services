import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import BoroughData from '../../Data/Boroughs.json';
import helpers from '../../helpers';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Mon-Fri'];
const areas = ['All', 'Central', 'East', 'North', 'South', 'West'];
const sortedBorough = BoroughData.map(borough => borough.borough).filter((elem, index, self) =>
  index === self.indexOf(elem)
).sort();

const OrganisationForm = (props) => {
  const categoriesName = props.categoriesName.categories ? props.categoriesName.categories : [];
  const checkedCategory = helpers.addSpaceToCategName(categoriesName, props.checkedCategory);
  return (
    <form className={props.formType}>
      <div className="form-first-row edit-field">
        <TextField
          className="edit-orgnasiation-name"
          label="Organisation name"
          name="Organisation"
          multiline
          rowsMax="4"
          value={props.name}
          onChange={props.onChange}
          fullWidth
        />
        <span className="text-field-container">
          <h4 className="not-include-in-add-org details-area">Area:</h4>
          <FormControl className="form-control-filed add-area">
            <InputLabel className="not-include-in-edit-org select-lable" htmlFor="controlled-open-select">Area</InputLabel>
            <Select
              open={props.openSelect}
              onClose={props.closeSelect}
              value={props.area}
              onChange={props.onChange}
              inputProps={{
                name: 'Area',
                id: 'controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {areas.map(area => (
                <MenuItem value={area}>{area}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </span>
        <span className="text-field-two-container">
          <h4 className="not-include-in-add-org details-area">Borough:</h4>
          <FormControl className="form-control-filed add-borough">
            <InputLabel className="not-include-in-edit-org select-lable" htmlFor="controlled-open-select">Borough</InputLabel>
            <Select
              open={props.openSelect}
              onClose={props.closeSelect}
              value={props.borough}
              onChange={props.onChange}
              inputProps={{
                name: 'Borough',
                id: 'controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {sortedBorough.map(borough => (
                <MenuItem value={borough}>{borough}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </span>
        <h4 className="not-include-in-add-org health-advice-title">Services
          <TextField
            className="not-include-in-add-org health-advice"
            fullWidth
            multiline
            rowsMax="4"
            name="Services"
            value={props.service}
            onChange={props.onChange}
          />
        </h4>
        <TextField
          className="process-lable"
          label="Process"
          fullWidth
          multiline
          rowsMax="4"
          name="Process"
          value={props.process}
          onChange={props.onChange}
        />
        <FormControl className="edit-day-field">
          <InputLabel className="select-lable" htmlFor="select-multiple">Days</InputLabel>
          <Select
            multiple
            value={props.day}
            onChange={props.handleMulitySelectChange}
            input={<Input id="select-multiple" />}
          >
            {days.map(day => (
              <MenuItem
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="telephone-label"
          label="Telephone"
          name="Tel"
          multiline
          rowsMax="4"
          value={props.telephone}
          onChange={props.onChange}
          fullWidth
        />
        <TextField
          className="email-label"
          label="Email"
          name="Email"
          multiline
          rowsMax="4"
          value={props.email}
          onChange={props.onChange}
          fullWidth
        />
        <TextField
          className="email-label add-website"
          label="Website"
          name="Website"
          multiline
          rowsMax="4"
          value={props.website}
          onChange={props.onChange}
          fullWidth
        />
        <TextField
          className="email-label add-project"
          label="Project"
          name="project"
          multiline
          rowsMax="4"
          value={props.project}
          onChange={props.onChange}
          fullWidth
        />
        <TextField
          className="email-label add-tag"
          label="Tag"
          name="tag"
          multiline
          rowsMax="4"
          value={props.tag}
          onChange={props.onChange}
          fullWidth
        />
      </div>
      <div className="form-third-row not-include-in-edit-org">
        <TextField
          multiline
          rows="4"
          label="Service"
          rowsMax="4"
          fullWidth
          name="Services"
          value={props.service}
          onChange={props.onChange}
        />
      </div>
      <h4 className="add-org-title categories-checkbox-title">Categories</h4>
      <div className="add-categories-checkbox categories-checkbox">
        {categoriesName.map(category => helpers.linkMaker(category) === props.checkedCategory ?
          (
            <FormControlLabel
              className="checkbox"
              control={
                <Checkbox
                  checked
                  onChange={props.handleCheckBox}
                  value={checkedCategory}
                  className="checkbox-color"
                />
              }
              label={checkedCategory}
              name={checkedCategory}
            />
          ) : (
            <FormControlLabel
              className="checkbox"
              control={
                <Checkbox
                  onChange={props.handleCheckBox}
                  value={helpers.linkMaker(category)}
                  className="checkbox-color"
                />
              }
              label={category}
              name={helpers.linkMaker(category)}
            />
          ))}
      </div>
    </form >
  )
}


OrganisationForm.propTypes = {
  formType: PropTypes.string.isRequired,
  categoriesName: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    categoriesName: state.categoriesList
  }
}

export default connect(mapStateToProps)(OrganisationForm);
