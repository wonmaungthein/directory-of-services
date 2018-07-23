import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducerRoot from '../../reducers';
import LoginForm from '../../Components/LoginForm';

configure({ adapter: new Adapter() });

const store = createStore(reducerRoot);

describe('LoginForm Component', () => {
    it('Should render without crashing', () => {
        const wrapper = 
        shallow(<Provider store={store}><LoginForm /></Provider>).length
        expect(wrapper).toEqual(1)
    })
}) 
