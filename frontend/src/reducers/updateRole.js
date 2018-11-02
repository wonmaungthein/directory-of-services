
import {  UPDATE_CURRENT_USER } from '../actions/types';

const initialState = {
  user: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
      case UPDATE_CURRENT_USER:
      return {
        user: action.user
      };
    default: return state;
  }
}