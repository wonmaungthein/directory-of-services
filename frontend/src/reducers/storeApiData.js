import { LIST_OF_CATEGORIES, LIST_OF_BOROUGHS, LIST_OF_AREAS, FILTERED_BRANCHS_BY_CATEGORY } from '../actions/types';

export function categoriesList(state = [], action = {}) {
  switch (action.type) {
    case LIST_OF_CATEGORIES:
      return {
        categories: action.categories
      };
    default: return state;
  }
}

export function boroughsList(state = [], action = {}) {
  switch (action.type) {
    case LIST_OF_BOROUGHS:
      return {
        boroughs: action.boroughs
      };
    default: return state;
  }
}

export function areasList(state = [], action = {}) {
  switch (action.type) {
    case LIST_OF_AREAS:
      return {
        areas: action.areas
      };
    default: return state;
  }
}

export function filteredBranchsByCategory(state = [], action = {}) {
  switch (action.type) {
    case FILTERED_BRANCHS_BY_CATEGORY:
      return {
        branchs: action.branchs
      };
    default: return state;
  }
}
