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

  getListOfCategoriesName: () =>
    Categories.query().skipUndefined(),

  getListOfBoroughsNames: () =>
    Branch.query().skipUndefined(),

  getListOfAreasNames: () =>
    Address.query().skipUndefined()
};
