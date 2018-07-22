import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OrganizationCard from '../../Components/Organisation/OrganisationCard';

configure({ adapter: new Adapter() });

describe('OrganizationCard Component', () => {
    it('Should render without crashing', () => {
        const wrapper = shallow(<OrganizationCard />).length
        expect(wrapper).toEqual(1)
    })
})