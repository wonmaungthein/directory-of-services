import React from 'react';
import EditOrganisation from './EditOrganisation';
import SingleOrganisation from './SingleOrganisation';
import Search from './Search';
import './index.css';
import orgData from './org_data';
import TopNav from '../TopNav';

const OrganisationCard = props => {
  const { params } = props.match;

  const service = params && params.service ? params.service : null;

  return (
    <div>
      <TopNav service={service} />
      <Search />
      <div className="single-organisation">
        {orgData.map(org => (
          <div className="form-card" key={org.id}>
            <EditOrganisation />
            <SingleOrganisation />
            <div className="single-orgonaization-details">
              <h4>{service} Service</h4>
              <h6>
                Area: {org.area} | Borough: {org.borough}
              </h6>
              <div className="health-advice-process">
                <p> - {service} advice</p>
                <p> - Help with {service}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganisationCard;
