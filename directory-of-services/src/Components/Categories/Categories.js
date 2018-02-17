import React from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from "react-router-dom";
import './categories.css'

const styles = {
    active: {
        background: '#1abcd4',
        color: '#000'
    },
    defualt: {
        background: 'transparent',
        color: '#95999c'
    },
    category: {
        marginLeft: '15px',
        color: '#95999c'
    },
    categoryState: {
        color: '#1abcd4',
        marginLeft: '15px',
    }
}

export default class Categories extends React.Component {

    state = {
        open: false,
        one: true,
        two: false,
        three: false,
        categoryState: false
    };

    render() {
        return (
            <div>
                <List className="categories">
                    <ListItem style={styles.category}
                        style={this.state.categoryState === false ? styles.categoryState : styles.defualt}
                        primaryText="Categories"
                        initiallyOpen={false}
                        nestedItems={[
                            <Link
                                onClick={() => {
                                    this.setState({
                                        one: true,
                                        two: false,
                                        three: false,
                                    })
                                }}
                                style={this.state.one === false ? styles.defualt : styles.active}
                                to="/debt">Debt</Link>,
                            <Link
                                onClick={() => {
                                    this.setState({
                                        one: false,
                                        two: true,
                                        three: false,
                                    })
                                }}
                                style={this.state.two === false ? styles.defualt : styles.active}
                                to="/ypfamilies">YP Families</Link>,
                            <Link
                                onClick={() => {
                                    this.setState({
                                        one: false,
                                        two: false,
                                        three: true,
                                    })
                                }}
                                style={this.state.three === false ? styles.defualt : styles.active}
                                to="/womendv">Women DV</Link>
                        ]}
                    />
                </List>

            </div>
        );
    }
}