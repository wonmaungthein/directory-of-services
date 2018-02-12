import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Categories from '../Categories/Categories'
import './side-bar.css'


class SideBar extends Component {

    render() {
        return (
            <nav class="mdc-drawer mdc-drawer--permanent mdc-typography">
                <div className="logo">
                    <Link to="/">LOGO</Link>
                </div>
                <Categories />
            </nav>
        )
    }

}

export default SideBar;