import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';
import reducerRoot from '../reducers';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/loginActions';

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
}

export default store;
