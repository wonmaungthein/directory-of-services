import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './organisation.css';

const styles = {
    textField: {
        width: '45px',
        fontSize: '.9em',
        top: '1px',
        padding: '0'
    },
    selectField: {
        width: '40%',
        fontSize: '.9em',
        top: '28px',
    },
    healthAdvice: {
        top: '-5px',
    }
};

class EditOrganisation extends React.Component {
    state = {
        open: false,
        id: null,
        area: "",
        borough: "",
        organisationName: "",
        advices: "",
        process: "",
        day: "",
        telephone: "",
        services: "",
        email: "",
        website: "",
        category: ""
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        const updateOrgonaization = {
            id: 1,
            area: this.state.area,
            borough: this.state.borough,
            organisationName: this.state.organisationName,
            advices: this.state.advices,
            process: this.state.process,
            day: this.state.day,
            telephone: this.state.telephone,
            services: this.state.services,
            email: this.state.email,
            website: this.state.website,
            category: this.state.category
        }
        console.log(updateOrgonaization)
        this.setState({
            area: "",
            borough: "",
            organisationName: "",
            advices: "",
            process: "",
            day: "",
            telephone: "",
            services: "",
            email: "",
            website: "",
            category: ""
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const actions = [
            <FlatButton
                className="cancel-button"
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                className="save-button"
                label="Save change"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ];
        return (
            <div>
                <button className="edit-button" onClick={this.handleOpen}>Edit</button>
                <Dialog className="customContentStyle"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <span className="edit-logo">Editing</span>
                    <form className="edit-orgonaization-form">
                        <TextField
                            hintText="Organisation name"
                            floatingLabelText=""
                            fullWidth={true}
                            name="organisationName"
                            value={this.state.organisationName}
                            onChange={e => this.handleChange(e)}
                        />
                        <h6 className="details-area">Area: <TextField
                            style={styles.textField}
                            hintText="North"
                            floatingLabelText=""
                            fullWidth={false}
                            name="area"
                            value={this.state.area}
                            onChange={e => this.handleChange(e)}
                        /> | Borough: <SelectField
                            floatingLabelText=""
                            value={this.state.value}
                            style={styles.selectField}
                            onChange={this.handleSelectChange}
                        >
                                <MenuItem value={1} primaryText="Never" />
                                <MenuItem value={2} primaryText="Every Night" />
                                <MenuItem value={3} primaryText="Weeknights" />
                                <MenuItem value={4} primaryText="Weekends" />
                                <MenuItem value={5} primaryText="Weekly" />
                            </SelectField></h6>
                        <div className="health-advice-process">
                            <p> - Health advice</p>
                            <TextField
                                style={styles.healthAdvice}
                                hintText="- Help accessing NHS"
                                floatingLabelText=""
                                fullWidth={true}
                                name="advices"
                                value={this.state.advices}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="process-date">
                            <div className="process">
                                <h3><strong>Process</strong></h3>
                                <TextField
                                    style={styles.healthAdvice}
                                    hintText="Call in advance (appt only)"
                                    floatingLabelText=""
                                    fullWidth={true}
                                    name="process"
                                    value={this.state.process}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="date">
                                <h3><strong>Day</strong></h3>
                                <TextField
                                    style={styles.healthAdvice}
                                    hintText="Monday"
                                    floatingLabelText=""
                                    fullWidth={true}
                                    name="day"
                                    value={this.state.day}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className="telephone-email">
                            <div className="telephone">
                                <h3><strong>Telephone</strong></h3>
                                <TextField
                                    style={styles.healthAdvice}
                                    hintText="028 297 4111"
                                    floatingLabelText=""
                                    fullWidth={true}
                                    name="telephone"
                                    value={this.state.telephone}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                            <div className="email">
                                <h3><strong>Email</strong></h3>
                                <TextField
                                    style={styles.healthAdvice}
                                    hintText="test@test.com"
                                    floatingLabelText=""
                                    fullWidth={true}
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)}
                                />
                            </div>
                        </div>
                        <TextField
                            hintText="http://www.haringeymsc.org"
                            floatingLabelText=""
                            fullWidth={true}
                            name="website"
                            value={this.state.website}
                            onChange={e => this.handleChange(e)}
                        />
                    </form>
                </Dialog>
            </div>
        )
    }
}
export default EditOrganisation;