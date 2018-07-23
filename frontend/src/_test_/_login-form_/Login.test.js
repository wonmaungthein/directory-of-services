import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../Components/LoginForm/LoginForm';

configure({ adapter: new Adapter() });

describe('Login Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Login />).length
        expect(wrapper).toEqual(1)
    })
}) 
