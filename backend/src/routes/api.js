import { postOrganisation } from '../controllers/post_controller';
import { seedData } from '../controllers/postInitialData';
import {
  getAllOrgainisation,
  getListOfCategories,
  getListOfBoroughs,
  getListOfAreas
} from '../controllers/get_controller';

module.exports = router => {
  router.post('/service', (req, res) => {
    const query = req.body;
    postOrganisation(query).then(responce => res.json(responce));
  });

  router.get('/service/all', async (req, res) => {
    try {
      await getAllOrgainisation().then(services =>
        res.json(services));
    } catch (err) {
      res.json(err)
    }
  });
  router.get('/service/migrate', async (req, res) => {
    try {
      await seedData().then(() =>
        res.json({ Migration: 'Data migration to database completed successfully !' }));
    } catch (err) {
      res.json(err)
    }
  });

  router.get('/service/categories', async (req, res) => {
    try {
      await getListOfCategories().then(categories =>
        res.json(categories));
    } catch (err) {
      res.json(err)
    }
  });

  router.get('/service/boroughs', async (req, res) => {
    try {
      getListOfBoroughs().then(boroughs =>
        res.json(boroughs));
    } catch (err) {
      res.json(err)
    }
  });

  router.get('/service/areas', async (req, res) => {
    try {
      await getListOfAreas().then(areas =>
        res.json(areas));
    } catch (err) {
      res.json(err)
    }
  });
}
