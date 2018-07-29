import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddUser from '../Components/Users/AddUser';

configure({ adapter: new Adapter() });

describe('AddUser Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<AddUser />).length
        expect(wrapper).toEqual(1)
    })
})
