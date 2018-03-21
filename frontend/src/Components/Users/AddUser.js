import React, { Fragment } from 'react';
import TextField from 'material-ui/TextField';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import Save from 'material-ui-icons/Save';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';

const AddUser = props => (
  <Fragment>
    <form className="add-user">
      <TextField
        label="Full name"
        className="full-name"
        name="fullName"
        value={props.name}
        onChange={props.handleFieldUpdate}
      />
      <TextField
        className="email"
        label="Email"
        name="email"
        value={props.email}
        onChange={props.handleFieldUpdate}
      />
      <FormControl className="form-control-filed">
        <InputLabel htmlFor="controlled-open-select">Role</InputLabel>
        <Select
          open={props.open}
          onClose={this.handleClose}
          value={props.role}
          onChange={props.handleFieldUpdate}
          inputProps={{
            name: 'role',
            id: 'controlled-open-select',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="editor">editor</MenuItem>
          <MenuItem value="admin">admin</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="raised"
        size="small"
        type="submit"
        className="add-user-button"
        onClick={props.handleSubmit}
      >
        <Save />save
      </Button>
    </form>
  </Fragment>
);

export default AddUser;
