
import { postOrganisation } from '../controllers/post_controller';
import { loadSeedToDb } from '../controllers/postInitialData';
import { removeDuplications } from '../helpers';
import {
  getAllOrgainisation,
  getListOfCategoriesName,
  getListOfBoroughsNames,
  getListOfAreasNames
} from '../controllers/get_controller';

module.exports = router => {
  router.post('/service', (req, res) => {
    const query = req.body;
    postOrganisation(query).then(responce => res.json(responce));
  });
  router.get('/service/all', (req, res) => {
    getAllOrgainisation().then(data => res.json(data));
  });
  router.get('/service/migrate', (req, res) => {
    loadSeedToDb().then(() => res.json({ Migration: 'Data migration to database completed successfully !' }));
  });

  router.get('/service/categories', (req, res) =>
    getListOfCategoriesName().map(data => data.cat_name)
      .then(categories => res.json(removeDuplications(categories))));

  router.get('/service/boroughs', (req, res) =>
    getListOfBoroughsNames().map(data => data.borough)
      .then(boroughs => res.json(removeDuplications(boroughs))));

  router.get('/service/areas', (req, res) =>
    getListOfAreasNames().map(data => data.area)
      .then(areas => res.json(removeDuplications(areas))));
}
