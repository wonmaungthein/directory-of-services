import axios from 'axios';

module.exports = {

  userSignupRequest = userInfo => {
    return dispatch => {
      return axios.post('/users', userInfo);
    }
  },

  isUserExists = userIdentifier => {
    return dispatch => {
      return axios.get(`/users/${identifier}`);
    }
  }

}
