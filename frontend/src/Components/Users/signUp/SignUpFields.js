import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';

const SignUpFields = props => {
  const { classes } = props;

  return (
    <form className="form-group">
      <h2> Create an account </h2>
      <TextField
        id="name"
        placeholder="Full Name"
        label="Full Name"
        className={classes}
        value={props.fullName}
        onChange={props.handleChange('name')}
        margin="normal"
      />

      <TextField
        id="email"
        placeholder="Email"
        label="Email"
        className={classes}
        value={props.email}
        onChange={props.handleChange('email')}
        margin="normal"
      />

      <TextField
        placeholder="Password"
        label="Password"
        className={classes}
        type="password"
        value={props.password}
        onChange={props.handleChange('password')}
        margin="normal"
      />

      <TextField
        placeholder="Password"
        label="Retype-Password"
        className={classes}
        type="password"
        value={props.retypePassword}
        onChange={props.handleChange('retypePassword')}
        margin="normal"
      />
      
      <h5>
        <Link to="/home">SIGN ME UP</Link>
      </h5>
      <Input className="input" type="submit" value="SIGN ME UP" />
    </form>
  );
};

SignUpFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SignUpFields;
