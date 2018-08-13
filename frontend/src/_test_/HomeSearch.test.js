import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../reducers';
import HomeSearch from '../Components/HomePage/HomeSearch';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('HomeSearch Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><HomeSearch /></Provider>).length
        expect(wrapper).toEqual(1)
    })
}) 
