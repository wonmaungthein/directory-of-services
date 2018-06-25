import React from 'react';
import TextFieldOrg from 'material-ui/TextField';

import './textfield.css';

const TextFieldEdit = (props) => (
  <TextFieldOrg 
    {...props} 
    InputLabelProps={{shrink: true, className: 'normal-weight'}}
  />
);

export default TextFieldEdit;
