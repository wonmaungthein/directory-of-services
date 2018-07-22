import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SingleOrganization from '../../Components/Organisation/SingleOrganisation';

configure({ adapter: new Adapter() });

describe('SingleOrganization Component', () => {
    it('Should render without crashing', () => {
        const wrapper = shallow(<SingleOrganization />).length
        expect(wrapper).toEqual(1)
    })
})