import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import './forgotPassword.css';

const HomeSearch = () => (
  <div className="forgot-password">
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
          // onClick={props.handleSubmit}
        >
          Sent
        </Button>
      </form>
    </Grid>
  </div>
);

export default HomeSearch;
