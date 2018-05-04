import axios from 'axios';
import { LIST_OF_CATEGORIES, LIST_OF_BOROUGHS, LIST_OF_AREAS, FILTERED_BRANCHS_BY_CATEGORY,  LIST_OF_ORGANISATIONS } from './types';

const api = 'http://localhost:3002/api' || `${process.env.API_URL}/api`;

export function setCategoriesList(categories) {
  return {
    type: LIST_OF_CATEGORIES,
    categories
  };
}

export function getCategories() {
  return dispatch => {
    axios.get(`${api}/service/categories`)
      .then(categories => dispatch(setCategoriesList(categories.data)))
  }
}

export function setBoroughsList(boroughs) {
  return {
    type: LIST_OF_BOROUGHS,
    boroughs
  };
}

export function getBoroughs() {
  return dispatch => {
    axios.get(`${api}/service/boroughs`)
      .then(boroughs => dispatch(setBoroughsList(boroughs.data)))
  }
}

export function setAreasList(areas) {
  return {
    type: LIST_OF_AREAS,
    areas
  };
}

export function getAreas() {
  return dispatch => {
    axios.get(`${api}/service/areas`)
      .then(areas => dispatch(setAreasList(areas.data)))
  }
}

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
    .then(all => dispatch(setOrganisationsList(all)))
  }
}

