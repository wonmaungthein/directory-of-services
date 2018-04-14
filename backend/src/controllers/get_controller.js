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
    try {
      const result = await Categories
        .query()
        .select('cat_name')
        .orderBy('cat_name')
        .distinct('cat_name')
        .map(category => category.cat_name)
      return result;
    } catch (error) {
      return error;
    }
  },

  getListOfBoroughs: async () => {
    try {
      const result = await Branch
        .query()
        .select('borough')
        .orderBy('borough')
        .distinct('borough')
        .map(borough => borough.borough)
      return result;
    } catch (error) {
      return error;
    }
  },

  getListOfAreas: async () => {
    try {
      const result = await Address
        .query()
        .select('area')
        .orderBy('area')
        .distinct('area')
        .map(area => area.area)
      return result;
    } catch (error) {
      return error;
    }
  }
};
