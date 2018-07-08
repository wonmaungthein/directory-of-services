import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import { getBranchsByCategory } from '../../actions/getApiData';
import { getBranchesFilteredByPostCode } from '../../actions/postData';
import Search from './Search';
import TopNav from '../TopNav';
import helpers from '../../helpers';
import OrganisationCard from './OrganisationCard';
import categoriesData from '../../Data/Categories.json';
import Spinner from '../Spinner';
import './index.css';

function getSelectedCategory(match) {
  const { params } = match;
  const service =
    params && params.service
      ? helpers.linkMaker(params.service)
      : null;
  return service;
}

class Organisations extends Component {
  state = {
    organisations: [],
    editIdx: -1,
    category: getSelectedCategory(this.props.match),
    day: '',
    borough: '',
    postCode: '',
    postcodeError: '',
    isLoading: false,
    sort: false

  };

  componentDidMount() {
    const category = helpers.addSpaceToCategName(categoriesData, this.props.match.url);
     const index = category.indexOf("Young People and Children");
      if (index !== -1) {
          category[index] = "Young People/Children";
      }
    this.props.getBranchsByCategory(category);
  }


  componentWillReceiveProps(newProps) {
    const { oganisation } = newProps;
    this.setState({
      category: getSelectedCategory(newProps.match),
      organisations: oganisation,
    });
  }

  handleSelectedDay = event => {
    this.setState({ day: event.target.value });
  };

  handleSelectedBorough = event => {
    this.setState({ borough: event.target.value });
  };

  filterByPostcode = postCode => {
    if (!postCode) {
      this.setState({
        organisations: this.state.organisations,
      });
    }
    const filteredOrg = this.state.organisations;
    if (filteredOrg && filteredOrg.filter) {
      this.setState({
        organisations: filteredOrg
      });

    }
  };

  handlePostCodeChange = (event, { newValue }) => {
    this.setState(
      {
        postCode: newValue,
      },
      this.filterByPostcode(newValue),
    );
  };

  handlePostSearch = async () => {
    if (this.state.postCode.length === 0) {
      this.setState({ postcodeError: 'Postcode is required *' })
    } else if(this.state.postCode.length < 5) {
      this.setState({ postcodeError: 'You have to inter valid postcode' })
    }else {
      const category = helpers.addSpaceToCategName(categoriesData, this.props.match.url)[0];
      const post = this.state.postCode.replace(/[' ']/g, '');
      this.setState({ isLoading: true, postcodeError: '' })
      const data = await fetch(`https://api.postcodes.io/postcodes/?q=${post}`);
      const res = await data.json()
      if (res.result && res.status === 200) {
        this.setState({ isLoading: true, sort: true })
        res.result.map(async info => {
          const lat = info.latitude
          const long = info.longitude
          const getBranches = await this.props.getBranchesFilteredByPostCode({ category, lat, long })
          const orgsData = [];
          getBranches.data
            .map(branchs => {
              const { distance } = branchs;
              const orgs = branchs.data;
              return orgsData.push({ distance, ...orgs })
            })
          this.setState({ organisations: orgsData })
        })
        this.setState({ isLoading: false })
      } else {
        this.setState({ postcodeError: 'Your postcode is incorrect', isLoading: false })
      }
    }
  }
  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
    });
  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };

  filterData = (data) => {
    const { day, borough } = this.state;
    if (day.length > 0 && borough.length > 0) {
      return data.filter(orgs =>
        orgs.service_days.includes(day) && orgs.borough.includes(borough)
      )
    } else if (day.length > 0 && borough.length <= 0) {
      return data.filter(orgs =>
        orgs.service_days.includes(day)
      )
    } else if (day.length <= 0 && borough.length > 0) {
      return data.filter(orgs =>
        orgs.borough.includes(borough)
      )
    }
    return data;
  }

  dataOrder = () => {
    if (!this.state.sort) {
      return helpers.sortArrObj
    }
    return (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  }

  render() {
    const { editIdx, category, postCode, borough, day, organisations } = this.state;
    if (this.state.isLoading || this.filterData.length === 0) {
      return <Spinner />
    }
    return (
      <div>
        <TopNav
          title={category}
          addLink={`services/${category}/add`}
          titleLink={`services/${category}`}
        />
        <Search
          service={category}
          borough={borough}
          day={day}
          postCode={postCode}
          handleSelectedDay={this.handleSelectedDay}
          handleSelectedBorough={this.handleSelectedBorough}
          handlePostCodeChange={this.handlePostCodeChange}
          handlePostSearch={this.handlePostSearch}
          postcodeError={this.state.postcodeError}
        />
        <Grid container className="organisation-page" spacing={24} wrap="wrap">
          {this.filterData(organisations.sort(this.dataOrder())).map((org, index) => {
            const currentlyEditing = editIdx === index;
            return currentlyEditing ? (
              <Fragment>
                <EditOrganisation
                  stopEditing={this.stopEditing}
                  editOrgData={org}
                  show
                />
                <SingleOrganisation
                  stopEditing={this.stopEditing}
                  handleShawDetails
                  org={org}
                />
              </Fragment>
            ) : (
              <Grid item xs={12} sm={6} key={org.id} className='card'> 
                <OrganisationCard
                  getData={() => this.editSelectedOrganisation(index)}
                  org={org}
                  index={index}
                />
              </Grid>
              );
          })}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    oganisation: state.filteredBranchsByCategory.branchs,
  }
}

export default connect(mapStateToProps, { getBranchsByCategory, getBranchesFilteredByPostCode })(Organisations);
