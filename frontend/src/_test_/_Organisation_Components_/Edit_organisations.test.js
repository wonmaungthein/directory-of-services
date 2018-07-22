import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditOrganisation from '../../Components/Organisation/EditOrganisation';

configure({ adapter: new Adapter() });

describe('Edit Organization Component', () => {
    it('Should render without crashing', () => {
        const wrapper = shallow(<EditOrganisation />).length
        expect(wrapper).toEqual(1)
    })
})
