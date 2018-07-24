import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CircularIndeterminate from '../Components/Spinner';

configure({ adapter: new Adapter() });

describe('CircularIndeterminate Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<CircularIndeterminate />).length
        expect(wrapper).toEqual(1)
    })
}) 
