import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './side-bar.css'


class SideBar extends Component {

    render() {
        return (
            <nav class="mdc-drawer mdc-drawer--permanent mdc-typography">
                <div className="logo">
                    <Link to="/">LOGO</Link>
                </div>
            </nav>
        )
    }

}

export default SideBar;