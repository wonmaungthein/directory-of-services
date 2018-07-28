import axios from 'axios';
import { FILTERED_BRANCHS_BY_CATEGORY,  LIST_OF_ORGANISATIONS, LIST_OF_USERS } from './types';

const api = process.env.REACT_APP_API_URL || process.env.REACT_APP_LOCALHOST_API_URL;

export function setGetBranchsByCategory(branchs) {
  return {
    type: FILTERED_BRANCHS_BY_CATEGORY,
    branchs
  };
}

export function getBranchsByCategory(category) {
  return dispatch => {
    axios.get(`${api}/service/category/?category=${category}`)
      .then(branchs => dispatch(setGetBranchsByCategory(branchs.data)))
  }
}

export function setOrganisationsList(organisations) {
  return{
    type: LIST_OF_ORGANISATIONS,
    organisations
  }
}

export function getOrganisationsList(){
  return dispatch => {
    axios.get(`${api}/service/all`)
    .then(all => dispatch(setOrganisationsList(all.data)))
  }
}

export function setListOfUsers(users) {
  return{
    type:LIST_OF_USERS,
    users
  }
}

export function getListOfUsers(){
  return dispatch => {
    axios.get(`${api}/users`)
    .then(response => dispatch(setListOfUsers(response.data)))
    .catch(error => error.response)
  }
}