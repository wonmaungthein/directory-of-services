import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import './organisation.css'

class AddOrganisation extends Component {
   state = {
        checked: false,
        area: "",
        borough: "",
        organisationName: "",
        process: "",
        day: "",
        telephone: "",
        services: "",
        category: ""
    };
    
    updateCheck(e) {
        this.setState({ 
            checked: e.target.value
        })
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            area: "",
            borough: "",
            organisationName: "",
            organisationName: "",
            process: "",
            day: "",
            telephone: "",
            services: "",
            checked: false
        });
        const orientation = {
            area: this.state.area,
            borough: this.state.borough,
            organisationName: this.state.organisationName,
            process: this.state.process,
            day: this.state.day,
            telephone: this.state.telephone,
            services: this.state.services,
            category: this.state.checked
        }
        console.log(orientation)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.value)
    }

    render(child) {
        return (
            <div className="add-orgonaization">
                <h1>Add new orgonaization</h1>
                <form>
                    <div className="form-first-row">
                        <TextField
                        className="first-field"    
                            hintText=""
                            floatingLabelText="Organisation name"
                            fullWidth={true}
                            name="organisationName"
                            value={this.state.organisationName}
                            onChange={event => this.handleChange(event)}
                        />
                        <TextField
                            className="second-field"    
                            hintText=""
                            floatingLabelText="Area"
                            fullWidth={true}
                            name="area"
                            value={this.state.area}
                            onChange={event => this.handleChange(event)}
                        />
                        <TextField
                            className="third-field"    
                            hintText=""
                            floatingLabelText="Borough"
                            fullWidth={true}
                            name="borough"
                            value={this.state.borough}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="form-second-row">
                        <TextField
                            className="first-field"
                            hintText="Email, then call"
                            floatingLabelText="Process"
                            fullWidth={true}
                            name="process"
                            value={this.state.process}
                            onChange={event => this.handleChange(event)}
                        />
                        <TextField
                            className="second-field"
                            hintText="Monday"
                            floatingLabelText="Day"
                            fullWidth={true}
                            name="day"
                            value={this.state.day}
                            onChange={event => this.handleChange(event)}
                        />
                        <TextField
                            className="third-field"
                            hintText="0141 000 0000"
                            floatingLabelText="Telephone"
                            fullWidth={true}
                            name="telephone"
                            type="number"
                            value={this.state.telephone}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="form-third-row">
                        <TextField
                            hintText="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                        wirl aliqua. Up exlaborum incididunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna wirl aliqua. Up exlaborum incididunt."
                            multiLine={true}
                            floatingLabelText="Services"
                            rows={2}
                            rowsMax={4}
                            fullWidth={true}
                            name="services"
                            value={this.state.services}
                            onChange={event => this.handleChange(event)}
                        />
                    </div>
                    <div className="add-category">
                        <span className="title">Categories</span>
                        <div className="categories">
                            <Checkbox
                            className="check-box"    
                                label="Health Care"
                                checked={this.state.checked}
                                onCheck={e => this.updateCheck(e)}
                                name="category"
                                value="education"
                            />
                            <Checkbox
                                className="check-box"    
                                label="Debit"
                                checked={this.state.checked}
                                onCheck={e => this.updateCheck(e)}
                                name="category"
                                value="health"
                            />
                        </div>
                    </div>
                    <FlatButton
                        className="add-orgonaization-link"
                        label="Save changes"
                        primary={true}
                        keyboardFocused={true}
                        onClick={event => this.handleSubmit(event)}
                    />
                </form>
            </div>
        )
    }
}

export default AddOrganisation;