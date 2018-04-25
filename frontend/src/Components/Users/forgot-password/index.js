import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import './forgotPassword.css';

const HomeSearch = props => (
  <div className="forgot-password">
    <Paper className="form-card">
      <p className="forgot-info">
        Enter your email address we will sent you the password reset link.
      </p>
      <Grid container spacing={24}>
        <form className="forgot-password-form">
          <TextField placeholder="Email" id="email" required />
          <Button
            variant="raised"
            size="small"
            type="submit"
            className="add-user-button"
            onSubmit={props.handleSubmit}
          >
            Sent
          </Button>
        </form>
      </Grid>
    </Paper>
  </div>
);

export default HomeSearch;
