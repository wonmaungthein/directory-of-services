import { combineReducers } from 'redux';

import loginAuth from './reducers/loginAuth';
import flashMessages from './reducers/flashMessages';

export default combineReducers({
  loginAuth,
  flashMessages
});