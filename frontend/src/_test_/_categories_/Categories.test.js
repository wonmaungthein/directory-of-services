import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Categories from '../../Components/Categories';

configure({ adapter: new Adapter() });

describe('Categories Component', () => {
        it('Should render without crashing', () => {
            const wrapper = 
            shallow(<Categories />).length
        expect(wrapper).toEqual(1)
    })
}) 
