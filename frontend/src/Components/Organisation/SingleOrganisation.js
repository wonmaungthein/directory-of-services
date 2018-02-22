import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditOrganisation from './EditOrganisation'
import './organisation.css'

import ContentAdd from 'material-ui/svg-icons/content/add';

const customContentStyle = {
    width: '500px',
    maxWidth: 'none',
};

class SingleOrganisation extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        return (
            <div>
                <button className="orgnaization-detais" onClick={this.handleOpen}><ContentAdd className="button-icon" /><span className="button-title">DETAILS</span></button>
                <Dialog
                    title="Haringey Migrant Service"
                    modal={false}
                    open={this.state.open}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}
                >
                    <EditOrganisation />
                    <h4 className="details-area">Area: North | Borough: Haringey</h4>
                    <div className="health-advice-process">
                        <p> - Health advice</p>
                        <p> - Help accessing NHS</p>
                    </div>
                    <div className="process-date">
                        <div className="process">
                            <h3><strong>Process</strong></h3>
                            <p>Call in advance (appt only)</p>
                        </div>
                        <div className="date">
                            <h3><strong>Day</strong></h3>
                            <p>Monday</p>
                        </div>
                    </div>
                    <div className="telephone-email">
                        <div className="telephone">
                            <h3><strong>Telephone</strong></h3>
                            <p>028 297 4111</p>
                        </div>
                        <div className="email">
                            <h3><strong>Email</strong></h3>
                            <p>test@test.com</p>
                        </div>
                    </div>
                    <a className="website-link" target="blank" href="http://www.haringeymsc.org">http://www.haringeymsc.org</a>
                    <h5 className="detail-footer">Healthcare, trafficking, destituition</h5>
                </Dialog>
            </div>
        )
    }
}
export default SingleOrganisation;