import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

const api = 'http://localhost:3002/api' || `${process.env.API_URL}/api`;

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch =>
    axios.post(`${api}/login`, data).then(res => {
      if (res.data.success !== false) {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        return res
      }
      return res
    });
}
