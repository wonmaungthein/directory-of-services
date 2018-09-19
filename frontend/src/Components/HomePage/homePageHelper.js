import helpers from '../../helpers';

// This function check for each organisation if the query enters by the user is include on one of the input field (org_name, borough ...) 
// and return that organisation if at least one input field pass the test

function queryResult(orgs, userQuery) {
  const arr = []
  orgs.filter(org => (
    Object.keys(org)
    .map(key => (
      userQuery.map(item => {
        if (typeof org[key] === 'string' && org[key].toLowerCase().includes(item.toLowerCase())) arr.push(org);
        return arr
      })
    ))
  ))
  return [...new Set(arr)]
}

const filterData = (orgs, search, postcodeValue) => {
  const userQuery = search.trim().split(' ');
  if (search && postcodeValue) {
    return queryResult(orgs, userQuery);
  } else if (search) {
    const output = queryResult(orgs, userQuery);
    return output.sort(helpers.sortArrObj)
  } else if (postcodeValue) {
    return orgs
  }
  return [];
}

export default {
  filterData
}