import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUpFields from '../Components/Users/signUp/SignUpFields';

configure({ adapter: new Adapter() });

describe('SignUpFields Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<SignUpFields />).length
        expect(wrapper).toEqual(1)
    })
})
