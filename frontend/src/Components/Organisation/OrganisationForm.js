import React from 'react';
import TextField from 'material-ui/TextField';
import './organisation.css';

const OrganisationForm = (props) => (
  <form className="org-content">
    <div className="form-first-row edit-field">
      <TextField
        className="edit-orgnasiation-name"
        label="Organisation name"
        name={props.organisationName}
        value={props.organisationNameValue}
        onChange={props.onChange}
        fullWidth
      />
      <span className="text-field-container">
        <h6 className="not-include-in-add-org details-area">Area:</h6>
        <TextField
          className="text-field"
          label="Area"
          name={props.area}
          value={props.areaValue}
          onChange={props.onChange}
          fullWidth
        />
      </span>  
      <span className="text-field-two-container">
        <h6 className="not-include-in-add-org details-area">| Borough:</h6>
        <TextField
          className="text-field-two"
          label="Borough"
          name={props.borough}
          value={props.boroughValue}
          onChange={props.onChange}
          fullWidth
        />
      </span>  
      <h4 className="not-include-in-add-org health-advice-title">- Health advice
        <TextField
          className="not-include-in-add-org health-advice"
          fullWidth
          name={props.advices}
          value={props.advicesValue}
          onChange={props.onChange}
        />
      </h4>    
      <TextField
        label="Process"
        className="edit-process-field"
        name={props.process}
        value={props.processValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="edit-day-field"
        label="Day"
        name={props.day}
        value={props.dayValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="telephone-label"
        label="Telephone"
        name={props.telephone}
        value={props.telephoneValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="email-label"
        label="Email"
        name={props.email}
        value={props.emailValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className="website-label add-website-field"
        label="Website"
        name={props.website}
        value={props.websiteValue}
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
        name={props.service}
        value={props.serviceValue}
        onChange={props.onChange}
      />
    </div>
    <h4 className="add-org-title categories-checkbox-title">Categories</h4>
    <div className="add-categories-checkbox categories-checkbox">
      <label htmlFor={props.category1}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category1Id} name={props.category1Name} value="Debt" />
        Debt
      </label>
      <label htmlFor={props.category2}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category2Id} name={props.category2Name} value="ypfamilies" />
        YP Families
      </label>
      <label htmlFor={props.category3}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category3Id} name={props.category3Name} value="womendv" />
        Women DV
      </label>
      <label htmlFor={props.category4}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category4Id} name={props.category4Name} value="trafficking" />
        Trafficking
      </label>
      <label htmlFor={props.category5}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category5Id} name={props.category5Name} value="healthcare" />
        HealthCare
      </label>
      <label htmlFor={props.category6}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category6Id} name={props.category6Name} value="destitution" />
        Destitution
      </label>
      <label htmlFor={props.category7}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category7Id} name={props.category7Name} value="lgbtqi" />
        LGBTQI
      </label>
      <label htmlFor={props.category8}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category8Id} name={props.category8Name} value="mentalhealthservices" />
        Mental Health Services
      </label>
      <label htmlFor={props.category9}>
        <input onChange={props.onChangeCheckbox} type="checkbox" id={props.category9Id} name={props.category8Name} value="healthcare" />
        Healthcare
      </label>
    </div>
  </form>
);


export default OrganisationForm;