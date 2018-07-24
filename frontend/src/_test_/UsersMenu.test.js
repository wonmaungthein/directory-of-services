import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UsersMenu from '../Components/Users/UsersMenu';

configure({ adapter: new Adapter() });

describe('UsersMenu Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<UsersMenu />).length
        expect(wrapper).toEqual(1)
    })
})