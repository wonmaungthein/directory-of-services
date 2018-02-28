import React from 'react';
import TextField from 'material-ui/TextField';

const OrganisationForm = (props) => (
  <form className={props.editOrgonaizationForm}>
    <div className={props.formFirstRow || props.editfields}>
      <TextField
        className={props.editOrgnasiationName}
        label="Organisation name"
        name={props.organisationName}
        value={props.organisationNameValue}
        onChange={props.onChange}
        fullWidth
      />
      <span className={props.textFieldContainer}>
        <h6 className={props.notIncludeInAddOrg || props.detailsArea}>Area:</h6>
        <TextField
          className={props.textField}
          label="Area"
          name={props.area}
          value={props.areaValue}
          onChange={props.onChange}
          fullWidth
        />
      </span>  
      <span className={props.textFieldTwoContainer}>
        <h6 className={props.notIncludeInAddOrg || props.detailsArea}>| Borough:</h6>
        <TextField
          className={props.textFieldTwo}
          label="Borough"
          name={props.borough}
          value={props.boroughValue}
          onChange={props.onChange}
          fullWidth
        />
      </span>  
      <h4 className={props.notIncludeInAddOrg || props.healthAdviceTitle}>- Health advice
        <TextField
          className={props.notIncludeInAddOrg || props.healthAdvice}
          fullWidth
          name={props.advices}
          value={props.advicesValue}
          onChange={props.onChange}
        />
      </h4>    
      <TextField
        label="Process"
        className={props.editProcessfield}
        name={props.process}
        value={props.processValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className={props.editDateField}
        label="Day"
        name={props.day}
        value={props.dayValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className={props.telephoneLabel}
        label="Telephone"
        name={props.telephone}
        value={props.telephoneValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className={props.emailLabel}
        label="Email"
        name={props.email}
        value={props.emailValue}
        onChange={props.onChange}
        fullWidth
      />
      <TextField
        className={props.websiteLabel || props.addWebsiteField}
        label="Website"
        name={props.website}
        value={props.websiteValue}
        onChange={props.onChange}
        fullWidth
      />
    </div>
    <div className={props.formThirdRow || props.notIncludeInEditOrg}>
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
    <h4 className={props.addOrgtitle || props.categoriesCheckboxTitle}>Categories</h4>
    <div className={props.addCategoriesCheckbox || props.categoriesCheckbox}>
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