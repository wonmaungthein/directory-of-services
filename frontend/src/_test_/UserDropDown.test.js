import React from 'react'
import configureStore from 'redux-mock-store'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserDropDown from '../Components/Users/UserDropDown';

const middlewares = []
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() });



describe('UserDropDown Component', () => {
    it('Should render without crashing', () => {
        const initialState = {}
  const store = mockStore(initialState)
  const wrapper = shallow(
    <UserDropDown  />,  { context: { store } }
   ).length
   expect(wrapper).toEqual(1)
  })
})
