import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import orgData from '../../Data/json/Debt.json'

const boroughs = orgData.data;
const areas = orgData.data;
const processData = orgData.data;

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const OrganisationForm = (props) => (
  <form className={props.formType}>
    <div className="form-first-row edit-field">
      <TextField
        className="edit-orgnasiation-name"
        label="Organisation name"
        name="name"
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
              name: 'area',
              id: 'controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {areas.map(area => ( 
              <MenuItem value={area.Area}>{area.Area}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
      <span className="text-field-two-container">
        <h4 className="not-include-in-add-org details-area">|Borough:</h4>
        <FormControl className="form-control-filed add-borough">
          <InputLabel className="not-include-in-edit-org select-lable" htmlFor="controlled-open-select">Borough</InputLabel>
          <Select
            open={props.openSelect}
            onClose={props.closeSelect}
            value={props.borough}
            onChange={props.onChange}
            inputProps={{
              name: 'borough',
              id: 'controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {boroughs.map(borough =>(
              <MenuItem value={borough.Borough}>{borough.Borough}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
      <h4 className="not-include-in-add-org health-advice-title">- Services
        <TextField
          className="not-include-in-add-org health-advice"
          fullWidth
          name="advices"
          value={props.advices}
          onChange={props.onChange}
        />
      </h4>
      <FormControl className="form-control-filed">
        <InputLabel className="select-lable" htmlFor="controlled-open-select">Process</InputLabel>
        <Select
          open={props.openSelect}
          onClose={props.closeSelect}
          value={props.process}
          onChange={props.onChange}
          inputProps={{
            name: 'process',
            id: 'controlled-open-select',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {processData.map(process =>(
            <MenuItem value={process.Process}>{process.Process}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="form-control-filed">
        <InputLabel className="select-lable" htmlFor="controlled-open-select">Days</InputLabel>
        <Select
          open={props.openSelect}
          onClose={props.closeSelect}
          value={props.day}
          onChange={props.onChange}
          inputProps={{
            name: 'day',
            id: 'controlled-open-select',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {days.map(day =>(
            <MenuItem value={day}>{day}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        className="telephone-label"
        label="Telephone"
        name="telephone"
        value={props.telephone}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="email-label"
        label="Email"
        name="email"
        value={props.email}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="email-label add-website"
        label="Website"
        name="website"
        value={props.website}
        onChange={props.onChange}
        fullWidth
      />
    </div>
    <div className="form-third-row not-include-in-edit-org">
      <TextField
        multiline
        rows="4"
        label="Service"
        fullWidth
        name="service"
        value={props.service}
        onChange={props.onChange}
      />
    </div>
    <h4 className="add-org-title categories-checkbox-title">Categories</h4>
    <div className="add-categories-checkbox categories-checkbox">
      <label htmlFor="category1Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category1Id" name="category_1" value="Debt" />
        Debt
      </label>
      <label htmlFor="category2Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category2Id" name="category_2" value="ypfamilies" />
        YP Families
      </label>
      <label htmlFor="category3Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category3Id" name="category_3" value="womendv" />
        Women DV
      </label>
      <label htmlFor="category4Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category4Id" name="category_4" value="trafficking" />
        Trafficking
      </label>
      <label htmlFor="category5Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category5Id" name="category_5" value="healthcare" />
        HealthCare
      </label>
      <label htmlFor="category6Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category6Id" name="category_6" value="destitution" />
        Destitution
      </label>
      <label htmlFor="category7Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category7Id" name="category_7" value="lgbtqi" />
        LGBTQI
      </label>
      <label htmlFor="category8Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category8Id" name="category_8" value="mentalhealthservices" />
        Mental Health Services
      </label>
      <label htmlFor="category9Id">
        <input onChange={props.onChangeCheckbox} type="checkbox" id="category9Id" name="category_9" value="healthcare" />
        Healthcare
      </label>
    </div>
  </form >
);

OrganisationForm.propTypes = {
  formType: PropTypes.string.isRequired,
};
export default OrganisationForm;