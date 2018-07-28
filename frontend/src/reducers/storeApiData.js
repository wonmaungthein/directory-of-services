import { FILTERED_BRANCHS_BY_CATEGORY, LIST_OF_ORGANISATIONS, LIST_OF_USERS} from '../actions/types';

export function filteredBranchsByCategory(state = [], action = {}) {
  switch (action.type) {
    case FILTERED_BRANCHS_BY_CATEGORY:
      return {
        branchs: action.branchs
      };
    default: return state;
  }
}

export function organisationsList(state = [], action = {}){
  switch (action.type) {
    case LIST_OF_ORGANISATIONS:
    return {
      areas: action.organisations
    }
   default: return state;
  }
}

export function listOfUsers (state = [], action = {}){
  switch (action.type) {
    case LIST_OF_USERS:
    return {
      users: action.users
    }
    default: return state;
  }
}