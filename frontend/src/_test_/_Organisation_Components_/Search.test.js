import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../../Components/Organisation/Search';

configure({ adapter: new Adapter() });

describe('Search Component', () => {
    it('Should render without crashing', () => {
        const wrapper = shallow(<Search />).length
        expect(wrapper).toEqual(1)
    })
})