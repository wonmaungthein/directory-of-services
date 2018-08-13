import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBar from '../Components/SideBar';

configure({ adapter: new Adapter() });

describe('SideBar Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<SideBar />).length
        expect(wrapper).toEqual(1)
    })
}) 
