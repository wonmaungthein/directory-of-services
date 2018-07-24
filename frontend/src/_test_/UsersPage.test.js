import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../reducers';
import UsersPage from '../Components/Users';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('UsersPage Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><UsersPage /></Provider>).length
        expect(wrapper).toEqual(1)
    })
})
