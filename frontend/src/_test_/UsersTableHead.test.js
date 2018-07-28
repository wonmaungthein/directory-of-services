import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UsersTableHead from '../Components/Users/UsersTableHead';

configure({ adapter: new Adapter() });

describe('UsersTableHead Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<UsersTableHead />).length
        expect(wrapper).toEqual(1)
    })
})
