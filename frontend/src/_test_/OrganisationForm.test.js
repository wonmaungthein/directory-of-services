import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../reducers';
import OrganizationForm from '../Components/Organisation/OrganisationForm';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('OrganizationForm Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><OrganizationForm /></Provider>).length
        expect(wrapper).toEqual(1)
    })
})