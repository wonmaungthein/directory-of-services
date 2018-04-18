import Organisation from '../model/Organisation';
import Categories from '../model/Categories';
import Branch from '../model/Branch';
import Service from '../model/Service';
import Address from '../model/Address';

module.exports = {
  getAllOrgainisation: async () => {
    try {
      const result = await Organisation
        .query()
        .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]');
      return result;
    } catch (error) {
      return error;
    }
  },

  getListOfCategories: async () => {
    try {
      const result = await Categories.query().skipUndefined()
        .select('cat_name')
        .orderBy('cat_name')
        .distinct('cat_name')
        .map(categories => categories.cat_name);  
      return result;
    } catch (err) {
      return err;
    }
  },

  getListOfBoroughs: async () => {
    try {
      const result = await Branch.query().skipUndefined()
        .select('borough')
        .orderBy('borough')
        .distinct('borough')
        .map(borough => borough.borough);
      return result;
    } catch (err) {
      return err;
    }
  },

  getListOfAreas: async () => {
    try {
      const result = await Address.query().skipUndefined()
        .select('area')
        .orderBy('area')
        .distinct('area')
        .map(area => area.area);
      return result;
    } catch (err) {
      return err;
    }
  },

  getBranchByCategory: async categoryName => {
    try {
      const result = await Organisation
        .query()
        .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
        .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
        .where('branch:service:categories.cat_name', 'like', `%${categoryName}%`)
      return result;
    } catch (error) {
      return error;
    }
  },

  getBranchByDay: async day => {
    try {
      const result = await Organisation
        .query()
        .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
        .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
        .where('branch:service.service_days', 'like', `%${day}%`)
      return result;
    } catch (error) {
      return error;
    }
  },

  getBranchByBorough: async boroughName => {
    try {
      const result = await Organisation
        .query()
        .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
        .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
        .where('branch.borough', 'like', `%${boroughName}%`)
      return result;
    } catch (error) {
      return error;
    }
  }
};
