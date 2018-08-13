import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {SET_CURRENT_USER} from './types';
import helpers from '../helpers';

const api = process.env.REACT_APP_API_URL || process.env.REACT_APP_LOCALHOST_API_URL;

export function setCurrentUser(user) {
  return {type: SET_CURRENT_USER, user};
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  const sendInfo = async (dispatch) => {
    try {
      const res = await axios.post(`${api}/login`, data);
      if (res.status === 200) {
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('role', res.data.user[0].role)
        setAuthorizationToken(token);
        if (res.data && res.data.user) {
          dispatch(setCurrentUser(jwtDecode(token)));
        }
        return res
      }
    } catch (error) {
      return helpers.errorParser(error)
    }
  }
  return sendInfo
}

export function signup(data) {
  const sendInfo = async () => {
    try {
      const res = await axios.post(`${api}/signup`, data)
      return res.data;
    } catch (error) {
      return helpers.errorParser(error)
    }
  }
  return sendInfo
}

// update user role
export function upDateUser(data) {
  const sendInfo = async () => {
    try {
    const editUser = await axios
    .put(`${api}/user/role`, data);
     return editUser.data
    } catch (error) {
      return helpers.errorParser(error)
    }
  }
  return sendInfo
}
