import { combineReducers } from 'redux';

import loginAuth from './loginAuth';
import flashMessages from './flashMessages';
import { categoriesList, boroughsList, areasList, filteredBranchsByCategory, organisationsList } from './storeApiData';

export default combineReducers({
  loginAuth,
  flashMessages,
  categoriesList,
  boroughsList,
  areasList,
  filteredBranchsByCategory,
  organisationsList
});
