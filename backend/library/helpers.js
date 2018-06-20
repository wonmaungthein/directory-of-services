function fetchNestedObj(object) {
  if (object) {
    return Object.keys(object)
      .reduce((accumulator, key) => {
        if (typeof object[key] !== 'object') {
          accumulator[key] = object[key];
          return accumulator;
        }
        return {
          ...accumulator,
          ...fetchNestedObj(object[key])
        }
      }, {});
  }
  return null;
}

export default {
  fetchNestedObj
};
