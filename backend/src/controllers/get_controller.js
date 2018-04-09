import Organisation from '../model/Organisation';
import Categories from '../model/Categories';
import Branch from '../model/Branch';
import Service from '../model/Service';

module.exports = {
  getAllOrgainisation: async () => {
    const result = await Organisation
      .query()
      .eager('[branch, branch.[address, address.[location] service, service.[categories]] ]');
    return result;
  },

  getListOfBranchesFilteredByCategory: categoryName =>
    Categories.query().skipUndefined()
      .where('cat_name', categoryName)
      .map(data => Service.query().findById(data.service_id))
      .map(data => Branch.query()
        .eager('[address, address.[location] service, service.[categories]]')
        .where('id', data.branch_id)),

  getListOfBranchesFilteredByDay: day =>
    Service.query().skipUndefined()
      .then(services => services.filter(data => data.service_days.includes(day)))
      .map(serviceData => Branch.query()
        .eager('[address, address.[location] service, service.[categories]]')
        .where('id', serviceData.branch_id)),

  getListOfBranchesFilteredByBorough: boroughName =>
    Branch.query().skipUndefined()
      .eager('[address, address.[location] service, service.[categories]]')
      .where('borough', boroughName)
};
