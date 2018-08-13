import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TopNav from '../Components/TopNav';

configure({ adapter: new Adapter() });

describe('TopNav Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<TopNav />).length
        expect(wrapper).toEqual(1)
    })
}) 
