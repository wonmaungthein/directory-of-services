import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducerRoot from '../reducers';
import App from '../App';

configure({ adapter: new Adapter() });

const store = createStore(
  reducerRoot,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

it('renders without crashing', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <App />
    </Provider>).length
    expect(wrapper).toEqual(1)
});


