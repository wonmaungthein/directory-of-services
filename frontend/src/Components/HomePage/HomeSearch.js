import React from 'react';
import Input, { InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';

import './HomePage.css';

const HomeSearch = () => (
  <Grid container spacing={24}>
    <Grid item xs={3}>
      <FormControl className="search">
        <Input
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <i className="material-icons">search</i>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  </Grid>
);

export default HomeSearch;
