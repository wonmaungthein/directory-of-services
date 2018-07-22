import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../../reducers';
import AddOrganisation from '../../Components/Organisation/AddOrganisation';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('Add Organization Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><AddOrganisation /></Provider>).length
        expect(wrapper).toEqual(1)
    })
})
