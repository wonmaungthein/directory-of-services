import Organisation from '../model/Organisation';
import Categories from '../model/Categories';
import Branch from '../model/Branch';
import Address from '../model/Address';

module.exports = {
  getAllOrgainisation: async () => {
    const result = await Organisation
      .query()
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]');
    return result;
  },

  getListOfCategories: async () => {
    const result = await Categories
      .query()
      .select('cat_name')
      .orderBy('cat_name')
      .distinct('cat_name')
    return result;
  },

  getListOfBoroughs: async () => {
    const result = await Branch
      .query()
      .select('borough')
      .orderBy('borough')
      .distinct('borough')
    return result;
  },

  getListOfAreas: async () => {
    const result = await Address
      .query()
      .select('area')
      .orderBy('area')
      .distinct('area')
    return result;
  }
};
