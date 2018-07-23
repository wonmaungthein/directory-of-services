import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../../reducers';
import UsersListTable from '../../Components/Users/UsersListTable';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('UsersListTable Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><UsersListTable /></Provider>).length
        expect(wrapper).toEqual(1)
    })
})
