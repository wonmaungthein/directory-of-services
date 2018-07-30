import helpers from '../../helpers';

const filterData = (orgs, search, postcodeValue) => {
    if (search && postcodeValue) {
      return orgs.filter(org => org.org_name.toLowerCase().includes(search.toLowerCase()) || org.borough.toLowerCase().includes(search.toLowerCase())
        // return branches which service match or part of search
        || search.toLowerCase().includes(org.service.toLowerCase())
        // return all branches which provide service on that day
        || org.service_days.toLowerCase().includes(search.toLowerCase())
        // return all branches if search match cat_name
        || org.cat_name.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.tag.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.area.toLowerCase().includes(search.toLowerCase())
      )
    } else if (search) {
      return orgs.filter(org => org.org_name.toLowerCase().includes(search.toLowerCase()) || org.borough.toLowerCase().includes(search.toLowerCase())
        // return branches which service match or part of search
        || search.toLowerCase().includes(org.service.toLowerCase())
        // return all branches which provide service on that day
        || org.service_days.toLowerCase().includes(search.toLowerCase())
        // return all branches if search match cat_name
        || org.cat_name.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.tag.toLowerCase().includes(search.toLowerCase())
        // return all branches if search tag match
        || org.area.toLowerCase().includes(search.toLowerCase())
      )
        .sort(helpers.sortArrObj)
    } else if (postcodeValue) {
      return orgs
    }
    return [];
  }

  export default {
      filterData
  }
  