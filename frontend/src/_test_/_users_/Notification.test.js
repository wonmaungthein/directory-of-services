import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Notification from '../../Components/Users/Notification';

configure({ adapter: new Adapter() });

describe('Notification Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Notification />).length
        expect(wrapper).toEqual(1)
    })
})
