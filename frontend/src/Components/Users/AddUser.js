import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';

import Save from 'material-ui-icons/Save';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';

export default class AddUser extends Component {
  state = {
    fullName: '',
    email: '',
    role: 'editor',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState = {
      fullName: '',
      email: '',
      role: 'editor',
    };
    console.log('this.state.fullName');
  };

  handleFieldUpdate = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    return (
      <Fragment>
        <form className="add-user">
          <TextField
            label="Full name"
            className="full-name"
            name="fullName"
            value={this.state.fullName}
            onChange={this.handleFieldUpdate}
          />
          <TextField
            className="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleFieldUpdate}
          />
          <FormControl className="form-control-filed">
            <InputLabel htmlFor="controlled-open-select">Role</InputLabel>
            <Select
              open={this.state.open}
              onClose={this.handleClose}
              value={this.state.role}
              onChange={this.handleFieldUpdate}
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
          <Link to="/users/">
            <Button
              variant="raised"
              size="small"
              type="submit"
              className="add-user-button"
              onSubmit={this.handleSubmit}
            >
              <Save />save
            </Button>
          </Link>
        </form>
      </Fragment>
    );
  }
}
