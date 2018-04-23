function fetchNestedObj(object) {
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

export default {
  fetchNestedObj
};
