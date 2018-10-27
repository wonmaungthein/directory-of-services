import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import reducerRoot from '../reducers';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser, updateCurrentUser } from '../actions/loginActions';

const store = createStore(
  reducerRoot,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  store.dispatch(updateCurrentUser(jwtDecode(localStorage.jwtToken)))
}

/* eslint-disable global-require */
if(module.hot) {
  module.hot.accept('../reducers/',() => {
    const nextRootReducer = require('../reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}
/* eslint-enable global-require */


export default store;
