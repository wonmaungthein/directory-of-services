import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
      <Button
        variant="raised"
        size="small"
        type="submit"
        className="add-user-button"
        onClick={props.handleSubmit}
      >
        Create My account
      </Button>
    </form>
  );
};

SignUpFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SignUpFields;
