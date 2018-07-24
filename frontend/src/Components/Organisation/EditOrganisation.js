import React, { Fragment } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, withMobileDialog, DialogTitle} from 'material-ui/Dialog';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';
import OrganisationForm from './OrganisationForm';
import { editOrganisation } from '../../actions/postData';
import helpers from '../../helpers';
import Spinner from '../Spinner';
import './edit-org.css';

const composedCategories = [
  'Gender Based Violence',
  'Mental Health Services',
  'Social and Other',
  'Baby Equipment'
]; 

const nonComposedCategories = [
  'Debt',
  'Trafficking',
  "LGBTQI",
  'Healthcare',
  'Education',
  'Benefits',
  'Families',
  'Housing',
  'Immigration'
];

// Categries format in FE
const checkCategories = [
  'Debt',
  'Trafficking',
  "LGBTQI",
  "Healthcare",
  "Education",
  "Benefits",
  "Families",
  'Gender Based Violence',
  "Housing",
  "Immigration",
  'Mental Health Services',
  'Social and Other',
  'Baby Equipment',
];

class EditOrganisation extends React.Component {
  state = {
    notificationSystem: null,
    open: this.props.show,
    Organisation: "",
    Area: "",
    Borough: "",
    Services: [],
    Process: "",
    Day: [],
    Tel: "",
    Email: "",
    Website: "",
    Categories: [],
    project: '',
    tag: '',
    postcode: '',
    clients: '',
    orgId: null,
    branchId: null,
    serviceId: null,
    addressId: null,
    isChecked: true,
    isLoading: false
  };

  componentWillMount() {
    const data = this.props.editOrgData;
    if (data) {
      const categories = [];
      
      // Data.cat_name.length is 1 => all category represents a single item 
      // So made a new array where each category is an individual item of the array
      for (let i = 0; i < checkCategories.length; i += 1) {
        const index = data.cat_name.includes(checkCategories[i]);
        if(index){
          categories.push(checkCategories[i]);
        } 
      }

      if (data.cat_name.includes('Pregnant Women and New Mothers')) {
        categories.push('Women');
      } else if (data.cat_name.includes('Employment/Training/Volunteering')){
        categories.push('Employment');  
      } else if (data.cat_name.includes('Young People/Children') || data.cat_name.includes('Young People and Children')){
        categories.push('Young People and Children');    
      } else if (data.cat_name.includes('Destitution/NRPF')){
        categories.push('Destitution');
      }
      
      this.setState({
        branchId: data.branch_id,
        orgId: data.org_id,
        serviceId: data.service_id,
        addressId: data.address_id,
        Organisation: data.org_name,
        Area: data.area,
        Borough: data.borough,
        Services: data.service,
        Process: data.process,
        Day: data.service_days.split(' '),
        Tel: data.telephone,
        Email: data.email_address,
        Website: data.website,
        Categories: [...new Set(categories)],
        project: data.project,
        tag: data.tag,
        postcode: data.postcode,
        clients: data.clients
      })
    }
  }

  componentDidMount() {
    this.setState({
      notificationSystem: this.refs.savedChanges
    })
  }

  savedChangesSuccessfully = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Success',
      message,
      level: 'success',
    });
  }

  unSucessSavedChanges = (message) => {
    this.state.notificationSystem.addNotification({
      title: 'Unsuccess',
      message,
      level: 'error',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const days = this.state.Day.join(' ');
    const categories = this.state.Categories.join(' ');
    const orgData = {
      branchId: this.state.branchId,
      serviceId: this.state.serviceId,
      addressId: this.state.addressId,
      orgId: this.state.orgId,
      organisation: this.state.Organisation,
      area: this.state.Area,
      borough: this.state.Borough,
      service: this.state.Services,
      process: this.state.Process,
      days: days,
      tel: this.state.Tel,
      email: this.state.Email,
      website: this.state.Website,
      categories: categories,
      address: "not provided",
      lat: "not provided",
      long: "not provided",
      postcode: this.state.postcode,
      project: this.state.project,
      clients: this.state.clients,
      tag: this.state.tag
    }
    
    this.setState({ isLoading: true });
    this.props.editOrganisation(orgData)
      .then(user => {
        if (user.data && user.data.success !== false) {
          this.savedChangesSuccessfully(user.data.message)
          this.setState({ open: false, isLoading: false })
          this.context.router.history.push(`${this.props.location.pathname}`)
        } else {
          this.unSucessSavedChanges(user.data.message)
          this.setState({isLoading: false })
        }
      });
  };

  handleFieldUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckBox = event => {
    const listOfCategories = [...this.state.Categories];
    let index;
    for(let i = 0; i < composedCategories.length; i += 1) {
  // Case where category is checked and category's name is composed
    if(event.target.checked && composedCategories[i].split(' ').join('').includes(event.target.value)) {
      if(listOfCategories.indexOf(composedCategories[i]) === -1) { 
        listOfCategories.push(composedCategories[i]);              
      } 
    } 
        
  // Case where category is not checked and category's name is composed
    if(!event.target.checked && event.target.value.includes(composedCategories[i].split(' ').join(''))) { 
      if(listOfCategories.indexOf(composedCategories[i]) > -1) {
        index = listOfCategories.indexOf(composedCategories[i])
        listOfCategories.splice(index, 1)             
        }
      } 
    }

 // Special case 
 // Young people
    if ( event.target.checked && event.target.value.includes('Young People and Children'.split(' ').join(''))){
      if(listOfCategories.indexOf('Young People and Children') === -1 ) {
          listOfCategories.push('Young People/Children')
        }

    if(listOfCategories.indexOf('Young People and Children') > -1 ) {
        index =  listOfCategories.indexOf('Young People and Children');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Young People/Children')
        } 
    }

    if ( !event.target.checked && event.target.value.includes('Young People and Children'.split(' ').join(''))){
      if(listOfCategories.includes('Young People and Children') || listOfCategories.includes('Young People/Children')) {        
        index = listOfCategories.indexOf('Young People and Children') || listOfCategories.indexOf('Young People/Children');
        listOfCategories.splice(index, 1);
      } 
    }  
      
  // Women
    if ( event.target.checked && event.target.value.includes('Women')){
      if(listOfCategories.indexOf('Women') === -1 ) {
        listOfCategories.push('Pregnant Women and New Mothers')
      } 
      if(listOfCategories.indexOf('Women') > -1 ) {
        index =  listOfCategories.indexOf('Women');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Pregnant Women and New Mothers')
      } 
    }

    if ( !event.target.checked && event.target.value.includes('Women')){
      if(listOfCategories.includes('Women') || listOfCategories.includes('Pregnant Women and New Mothers')) {        
        index = listOfCategories.indexOf('Women') || listOfCategories.indexOf('Pregnant Women and New Mothers');
        listOfCategories.splice(index, 1);
      } 
    }  

      // Employment
    if ( event.target.checked && event.target.value === ('Employment')){
      if(listOfCategories.indexOf('Employment') === -1 ) {
        listOfCategories.push('Employment/Training/Volunteering')
      } 
      if(listOfCategories.indexOf('Employment') > -1 ) {
        index =  listOfCategories.indexOf('Employment');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Employment/Training/Volunteering')
        } 
    }
    if ( !event.target.checked && event.target.value === ('Employment')){
      if(listOfCategories.includes('Employment') || listOfCategories.includes('Employment/Training/Volunteering')) {        
        index = listOfCategories.indexOf('Employment') || listOfCategories.indexOf('Employment/Training/Volunteering');
        listOfCategories.splice(index, 1);
        } 
    }

    if ( event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.indexOf("Destitution/NRPF") === -1) {
      listOfCategories.push("Destitution/NRPF");
      }
    }

    if ( !event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.includes("Destitution/NRPF")) {        
        index = listOfCategories.indexOf("Destitution/NRPF")
        listOfCategories.splice(index, 1);
      }
    }

    if ( !event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.includes('Destitution') || listOfCategories.includes('Destitution/NRPF')) {        
        index = listOfCategories.indexOf('Destitution') || listOfCategories.indexOf('Destitution/NRPF');
        listOfCategories.splice(index, 1);
      } 
    } 

    for(let i = 0; i < nonComposedCategories.length; i += 1) {
    // Case where category is checked and category's name is not composed
      if(event.target.checked && event.target.value.includes(nonComposedCategories[i].split(' ').join(''))){
        if(listOfCategories.indexOf(event.target.value) === -1 ) {
          listOfCategories.push(event.target.value);              
        } 
      }

    // Case where category is not checked and category's name is not composed
      if(!event.target.checked && event.target.value.includes(nonComposedCategories[i].split(' ').join(''))){
        if(listOfCategories.indexOf(event.target.value) > -1) {
          index = listOfCategories.indexOf(event.target.value)
          listOfCategories.splice(index, 1)
        }
      }
    } 

    this.setState({
      [event.target.name]: event.target.checked,
      Categories: [...new Set(listOfCategories)],
    });
  };

  handleDefaultCheckbox = event => { 
    const listOfCategories = [...this.state.Categories];
    let index;
    for(let i = 0; i < composedCategories.length; i += 1) {
  // Case where category is checked and category's name is composed
    if(event.target.checked && composedCategories[i].split(' ').join('').includes(event.target.value)) {
      if(listOfCategories.indexOf(composedCategories[i]) === -1) { 
        listOfCategories.push(composedCategories[i]);              
      } 
    } 
        
  // Case where category is not checked and category's name is composed
    if(!event.target.checked && event.target.value.includes(composedCategories[i].split(' ').join(''))) { 
      if(listOfCategories.indexOf(composedCategories[i]) > -1) {
        index = listOfCategories.indexOf(composedCategories[i])
        listOfCategories.splice(index, 1)             
        }
      } 
    }

// Special case 
// Young people
    if ( event.target.checked && event.target.value.includes('Young People and Children'.split(' ').join(''))){
      if(listOfCategories.indexOf('Young People and Children') === -1 ) {
          listOfCategories.push('Young People/Children')
        }

    if(listOfCategories.indexOf('Young People and Children') > -1 ) {
        index =  listOfCategories.indexOf('Young People and Children');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Young People/Children')
        } 
    }

    if ( !event.target.checked && event.target.value.includes('Young People and Children'.split(' ').join(''))){
      if(listOfCategories.includes('Young People and Children') || listOfCategories.includes('Young People/Children')) {        
        index = listOfCategories.indexOf('Young People and Children') || listOfCategories.indexOf('Young People/Children');
        listOfCategories.splice(index, 1);
      } 
    }  
      
  // Women
    if ( event.target.checked && event.target.value.includes('Women')){
      if(listOfCategories.indexOf('Women') === -1 ) {
        listOfCategories.push('Pregnant Women and New Mothers')
      } 
      if(listOfCategories.indexOf('Women') > -1 ) {
        index =  listOfCategories.indexOf('Women');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Pregnant Women and New Mothers')
      } 
    }

    if ( !event.target.checked && event.target.value.includes('Women')){
      if(listOfCategories.includes('Women') || listOfCategories.includes('Pregnant Women and New Mothers')) {        
        index = listOfCategories.indexOf('Women') || listOfCategories.indexOf('Pregnant Women and New Mothers');
        listOfCategories.splice(index, 1);
      } 
    }  

      // Employment
    if ( event.target.checked && event.target.value === ('Employment')){
      if(listOfCategories.indexOf('Employment') === -1 ) {
        listOfCategories.push('Employment/Training/Volunteering')
      } 
      if(listOfCategories.indexOf('Employment') > -1 ) {
        index =  listOfCategories.indexOf('Employment');
        listOfCategories.splice(index, 1);
        listOfCategories.push('Employment/Training/Volunteering')
        } 
    }
    if ( !event.target.checked && event.target.value === ('Employment')){
      if(listOfCategories.includes('Employment') || listOfCategories.includes('Employment/Training/Volunteering')) {        
        index = listOfCategories.indexOf('Employment') || listOfCategories.indexOf('Employment/Training/Volunteering');
        listOfCategories.splice(index, 1);
        } 
    }

    if ( event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.indexOf("Destitution/NRPF") === -1) {
      listOfCategories.push("Destitution/NRPF");
      }
    }

    if ( !event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.includes("Destitution/NRPF")) {        
        index = listOfCategories.indexOf("Destitution/NRPF")
        listOfCategories.splice(index, 1);
      }
    }

    if ( !event.target.checked && event.target.value === ('Destitution')){
      if(listOfCategories.includes('Destitution') || listOfCategories.includes('Destitution/NRPF')) {        
        index = listOfCategories.indexOf('Destitution') || listOfCategories.indexOf('Destitution/NRPF');
        listOfCategories.splice(index, 1);
      } 
    } 

    for(let i = 0; i < nonComposedCategories.length; i += 1) {
    // Case where category is checked and category's name is not composed
      if(event.target.checked && event.target.value.includes(nonComposedCategories[i].split(' ').join(''))){
        if(listOfCategories.indexOf(event.target.value) === -1 ) {
          listOfCategories.push(event.target.value);              
        } 
      }

    // Case where category is not checked and category's name is not composed
      if(!event.target.checked && event.target.value.includes(nonComposedCategories[i].split(' ').join(''))){
        if(listOfCategories.indexOf(event.target.value) > -1) {
          index = listOfCategories.indexOf(event.target.value)
          listOfCategories.splice(index, 1)
        }
      }
    }

    this.setState({
      [event.target.name]: event.target.value,
      Categories: [...new Set(listOfCategories)],
      isChecked:!this.state.isChecked,
    });
    
   };



  handleMulitySelectChange = event => {
    this.setState({ Day: event.target.value });
  };

  handleClose = () => {
    this.props.stopEditing()
    this.setState({ open: false });
  };

  render() {
    const checkedCategory = helpers.categoryNameMaker(this.props.location.pathname);
    if (this.state.isLoading) {
      return <Spinner color='blue' bgColor='spinnerEdit' />;
    }
    return (
      <Fragment>
        <div className="org-edit-btn">
          <Button className="btn edit-button" onClick={this.props.getData}>
            <i className="material-icons" size="small" variant="raised" >edit</i>EDIT
          </Button>
        </div>
        <NotificationSystem ref="savedChanges" />
        <Dialog
          className="edit-org"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
          modal
          autoDetectWindowHeight
          autoScrollBodyContent
          contentStyle={{width: 100, maxWidth: "none"}}
        >
          <DialogTitle id="form-dialog-title" className="edit-org-title"> 
            <div> {""}</div>
            <div className="org-close-btn"> 
              <Button
                onClick={this.handleClose}
                className="close-button"
              >
                <i className="material-icons" size="small" variant="raised">close</i>
              </Button> 
            </div>
          </DialogTitle>
          <DialogContent className="edit-content">
            <OrganisationForm
              edit
              name={this.state.Organisation}
              service={this.state.Services}
              area={this.state.Area}
              selectedArea={this.state.Area}
              borough={this.state.Borough}
              selectedBorough={this.state.Borough}
              process={this.state.Process}
              day={this.state.Day}
              telephone={this.state.Tel}
              email={this.state.Email}
              website={this.state.Website}
              project={this.state.project}
              tag={this.state.tag}
              postcode={this.state.postcode}
              clients={this.state.clients}
              checkedCategory={checkedCategory}
              openSelect={this.state.openSelect}
              closeSelect={this.handleClose}
              handleMulitySelectChange={this.handleMulitySelectChange}
              formType="edit-org"
              handleCheckBox={this.handleCheckBox}
              onChangeCheckbox={this.handleCheckbox}
              onChange={this.handleFieldUpdate}
              check={this.state.isChecked}
              handleDefaultCheckbox={this.handleDefaultCheckbox}
              close={this.handleClose}
            />
          </DialogContent>
          <DialogActions>
            <Button
              className="cancel-btn"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              className="save-btn"
              onClick={this.handleSubmit}
              color="primary"
              size="small"
              autoFocus
            >
              save changes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditOrganisation.propTypes = {
  editOrganisation: PropTypes.func.isRequired
};

EditOrganisation.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default withMobileDialog()(connect(null, { editOrganisation })(withRouter(props => <EditOrganisation {...props} />)));
