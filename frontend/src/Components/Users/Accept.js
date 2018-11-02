import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Button from 'material-ui/Button';
import NotificationSystem from 'react-notification-system';
import { acceptAccess,  rejectAccess} from '../../actions/loginActions';
import RequestedTableHead from './RequestedTableHead';
import './user-table.css';

class Accept extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'fullname',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  componentWillReceiveProps(newProps) {
    const users = newProps.usersList;

    if (users) {
      this.setState({
        data: users,
      })
    }
  }

  handleAccept = (data, event) => {
    event.preventDefault();
    this.props.acceptAccess(data);
    this.setState()
    window.location.reload();
  };
  handleReject = (data, event) => {
    event.preventDefault();
    this.props.rejectAccess(data);
    window.location.reload();
  };


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };


  handleUserDataChange = (e) => {
    const { value } = e.target;
    this.setState({
      [e.target.name]: value,
    })
  };

  render() {
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const usersList = data.length > 1 ? data : this.props.usersList;
    const haveRequestedEditors = usersList.filter(user => user.hasRequestedEditor)
    const emptyRows = null;
    return (
      <Fragment>
        <NotificationSystem ref="savedChanges" />
        <Table className="users-table">
          <RequestedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={data.length}
            params='Actions'
            usersList={usersList}
            haveRequestedEditors={haveRequestedEditors}
          />
          <TableBody className="users-tbody">
            {haveRequestedEditors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow key={row.id}>
                  <TableCell className="user-text">{row.fullname}</TableCell>
                  <TableCell className="user-text">{row.organisation}</TableCell>
                  <TableCell className="user-text">{row.role ? row.role : 'None'}</TableCell>
                  <TableCell className="user-text">{row.email}</TableCell>
                  {this.props.params === "/user/profile" ? null :
                  <TableCell className="user-text">
                    <Button onClick={(event) => this.handleAccept(row.id, event)} raised="true" >
                      <i className="material-icons">done</i>Accept
                    </Button>
                    <Button onClick={(event) => this.handleReject(row.id, event)} raised="true">
                      <i className="material-icons">highlight_off</i>Decline
                    </Button>
                  </TableCell>
                      }
                </TableRow>
                  ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 49 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {this.props.params !== "/accept" &&
            <TableFooter className="users-tfoot">
              <TableRow>
                <TablePagination
                  className="pagination-arrows"
                  colSpan={6}
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          }
        </Table>
      </Fragment>
    );
  }
}

Accept.PropsTypes = {
  upDateUser: PropTypes.func.isRequired
}

Accept.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    email: state.loginAuth.user.email,
  };
}

export default connect(mapStateToProps, { acceptAccess, rejectAccess })(Accept);
