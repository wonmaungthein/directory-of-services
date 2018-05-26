import React, {Fragment} from 'react';
import Typography from 'material-ui/Typography';
import {FormHelperText} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

const login = props => (
  <Paper className="login-form-content">
    {props.userVerification && <FormHelperText className="error"> {props.userVerification}</FormHelperText>}
    <Typography color="primary" variant="display3">
      Login
    </Typography>
    <form className="login-form">
      <Fragment>
        <TextField
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={props.email}
          onChange={props.handleFieldsChange}
          onBlur={props.handleBlur}
          margin="normal" 
        />
        <FormHelperText className="error">{props.emailErr}</FormHelperText>
      </Fragment>
      <Fragment>
        <TextField
          autoComplete="password"
          id="password"
          label="Password"
          name="password"
          value={props.password}
          onChange={props.handleFieldsChange}
          onBlur={props.handleBlur}
          margin="normal"
          type="password" 
        />
        <FormHelperText className="error">{props.passwordErr}</FormHelperText>
      </Fragment>
      <Button onClick={props.handleLogin} variant="raised" color="primary">
        Submit
      </Button>
      <p>
        Forget your password? Click reset option on top
      </p>
    </form>
  </Paper>
);

export default login;