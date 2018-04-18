import Organisation from '../model/Organisation';
import Categories from '../model/Categories';
import Branch from '../model/Branch';
import Service from '../model/Service';

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
