import { combineReducers } from 'redux';

import loginAuth from './loginAuth';
import flashMessages from './flashMessages';

export default combineReducers({
  loginAuth,
  flashMessages
});