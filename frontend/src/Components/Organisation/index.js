import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import { getBranchsByCategory } from '../../actions/getApiData';
import Search from './Search';
import TopNav from '../TopNav';
import helpers from '../../helpers';
import Benefits from '../../Data/json/Benefits.json';
import Debt from '../../Data/json/Debt.json';
import Education from '../../Data/json/Education.json';
import YPFamilies from '../../Data/json/YoungPeopleChildren.json';
import WomenDV from '../../Data/json/Women.json';
import Trafficking from '../../Data/json/Trafficking.json';
import Destitution from '../../Data/json/Destitution.json';
import LGBTQI from '../../Data/json/LGBTQI.json';
import MentalHealth from '../../Data/json/MentalHealthServices.json';
import Healthcare from '../../Data/json/Healthcare.json';
import EmploymentTrainingVolunteering from '../../Data/json/Employment.json';
import GenderBasedViolence from '../../Data/json/GenderBasedViolence.json';
import Housing from '../../Data/json/Housing.json';
import Immigration from '../../Data/json/Immigration.json';
import SocialandOther from '../../Data/json/SocialAndOther.json';
import OrganisationCard from './OrganisationCard';
import categoriesData from '../../Data/Categories.json';
import './index.css';

const originalOrganisations = {
  Education: Education.data,
  Debt: Debt.data,
  Benefits: Benefits.data,
  YPFamilies: YPFamilies.data,
  WomenDV: WomenDV.data,
  Trafficking: Trafficking.data,
  Destitution: Destitution.data,
  LGBTQI: LGBTQI.data,
  MentalHealth: MentalHealth.data,
  CommunityCare: Healthcare.data,
  DestitutionNRPF: Destitution.data,
  EmploymentTrainingVolunteering: EmploymentTrainingVolunteering.data,
  Families: YPFamilies.data,
  GenderBasedViolence: GenderBasedViolence.data,
  Housing: Housing.data,
  Immigration: Immigration.data,
  MentalHealthServices: MentalHealth.data,
  PregnantWomenNewMothers: WomenDV.data,
  SocialandOther: SocialandOther.data,
  Women: WomenDV.data,
  YoungPeopleChildren: YPFamilies.data,
  Healthcare: Healthcare.data,
};

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
    organisations: originalOrganisations,
    editIdx: -1,
    category: getSelectedCategory(this.props.match),
    day: null,
    service: null,
    postCode: '',
  };

  componentDidMount() {
    const category = helpers.addSpaceToCategName(categoriesData, this.props.match.url);
    this.props.getBranchsByCategory(category);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      category: getSelectedCategory(newProps.match),
      organisations: originalOrganisations,
      day: null,
      service: null,
      postCode: '',
    });
  }
  filterByDay = day => {
    if (!day) {
      this.setState({
        organisations: originalOrganisations,
      });
    }
    const { category } = this.state;
    const filteredOrg = originalOrganisations[category];

    if (filteredOrg && filteredOrg.filter) {
      this.setState({
        organisations: {
          [category]: filteredOrg.filter(org =>
            org.Day.includes(day),
          ),
        },
      });
    }
  };

  handleSelectedDay = day => {
    if (day) {
      this.setState(
        {
          day,
        },
        this.filterByDay(day),
      );
    }
  };

  filterByService = service => {
    if (!service) {
      this.setState({
        organisations: originalOrganisations,
      });
    }
    const { category } = this.state;
    const filteredOrg = originalOrganisations[category];
    if (filteredOrg && filteredOrg.filter) {
      this.setState({
        organisations: {
          [category]: filteredOrg.filter(org =>
            org.Services.includes(service),
          ),
        },
      });
    }
  };

  handleServiceChange = service => {
    this.setState(
      {
        service,
      },
      this.filterByService(service),
    );
  };

  filterByPostcode = postCode => {
    if (!postCode) {
      this.setState({
        organisations: originalOrganisations,
      });
    }
    const { category } = this.state;
    const filteredOrg = originalOrganisations[category];
    if (filteredOrg && filteredOrg.filter) {
      this.setState({
        organisations: {
          [category]: filteredOrg.filter(org =>
            org.Postcode.toLowerCase().includes(postCode.toLowerCase()),
          ),
        },
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


  editSelectedOrganisation = idex =>
    this.setState({
      editIdx: idex,
    });
  stopEditing = () => {
    this.setState({
      editIdx: -1,
    });
  };
  deleteOrganisation = (category, orgId) => {
    const newData =
      this.state.organisations && this.state.organisations[category]
        ? this.state.organisations[category].filter(org => org._id !== orgId)
        : [];
    this.setState({
      organisations: originalOrganisations,
      [category]: newData,
    });
  };
  render() {
    const oganisationData = this.props.oganisation ? this.props.oganisation : [];
    const { editIdx, category, day, service, postCode } = this.state;

    return (
      <div>
        <TopNav
          title={category}
          addLink={`services/${category}/add`}
          titleLink={`services/${category}`}
        />
        <Search
          service={category}
          myService={service}
          day={day}
          postCode={postCode}
          handleSelectedDay={this.handleSelectedDay}
          handleServiceChange={this.handleServiceChange}
          handlePostCodeChange={this.handlePostCodeChange}
        />
        <Grid container className="organisation-page" spacing={24}>
          {oganisationData.map((org, index) => {
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
              <Grid item xs={12} sm={6} key={org.id}>
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

Organisations.propTypes = {
  oganisation: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, { getBranchsByCategory })(Organisations);
