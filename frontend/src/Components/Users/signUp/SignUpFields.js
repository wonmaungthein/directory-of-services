import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const SignUpFields = props => {
  const { classes } = props;
  return (
    <form className="form-group">
      <TextField
        id="name"
        placeholder="Full Name"
        label="Full Name"
        className={classes.textField}
        value={props.fullName}
        onChange={props.handleChange('fullname')}
        margin="normal"
        required
      />
      <TextField
        select
        label="Select Your organisation"
        className={classes.textFiel}
        value={props.organisations}
        onChange={props.handleChange('organisations')}
      >
        {props.list.map(option => (
          <MenuItem key={option.value} value={option.id}>
            {option.org_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="username"
        placeholder="Username"
        label="Username"
        className={classes.textField}
        value={props.username}
        onChange={props.handleChange('username')}
        margin="normal"
        required
        helperText={props.userNameError}
      />
<<<<<<< HEAD
=======

      <TextField
        id="Organisation"
        placeholder="Your organisation name"
        label="Organisation"
        className={classes.textField}
        value={props.organisation}
        onChange={props.handleChange('organisation')}
        margin="normal"
        helperText={props.organisationError}
        required
      />

>>>>>>> bd642cd2b77642be82ef9fcee8382ab854eed972
      <TextField
        id="email"
        placeholder="Email"
        label="Email"
        className={classes.textField}
        value={props.email}
        onChange={props.handleChange('email')}
        margin="normal"
        helperText={props.emailError}
        required
      />

      <TextField
        placeholder="Password"
        label="Password"
        className={classes.textField}
        type="password"
        value={props.password}
        onChange={props.handleChange('password')}
        margin="normal"
        required
        helperText={props.passwordError}
      />

      <TextField
        placeholder="Confirm Password"
        label="Confirm Password"
        className={classes.textField}
        type="password"
        value={props.confirmPassword}
        onChange={props.handleChange('confirmPassword')}
        margin="normal"
        required
        helperText={props.confirmPasswordError}
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

export default withStyles(styles)(SignUpFields);
