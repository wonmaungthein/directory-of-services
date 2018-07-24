import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserDropDown from '../Components/Users/UserDropDown';

configure({ adapter: new Adapter() });

describe('UserDropDown Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<UserDropDown />).length
        expect(wrapper).toEqual(1)
    })
})
