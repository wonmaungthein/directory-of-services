import Organisation from '../model/Organisation';
import Categories from '../model/Categories';
import Branch from '../model/Branch';
import Service from '../model/Service';

module.exports = {
  getAllOrgainisation: async () => {
    const result = await Organisation
      .query()
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]');
    try {
      return result;
    } catch (error) {
      return error;
    }
  },

  getBranchByCategory: async categoryName => {
    const result = await Organisation
      .query()
      .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
      .where('branch:service:categories.cat_name', 'like', `%${categoryName}%`)
    try {
      return result;
    } catch (error) {
      return error;
    }
  },

  getBranchByDay: async day => {
    const result = await Organisation
      .query()
      .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
      .where('branch:service.service_days', 'like', `%${day}%`)
    try {
      return result;
    } catch (error) {
      return error;
    }
  },

  getBranchByBorough: async boroughName => {
    const result = await Organisation
      .query()
      .eagerAlgorithm(Organisation.JoinEagerAlgorithm)
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]')
      .where('branch.borough', 'like', `%${boroughName}%`)
    try {
      return result;
    } catch (error) {
      return error;
    }
  }
};
