
import { postOrganisation } from '../controllers/post_controller';
import { loadSeedToDb } from '../controllers/postInitialData';
import {
  getAllOrgainisation,
  getBranchByCategory,
  getBranchByDay,
  getBranchByBorough
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

  router.get('/service/category', async (req, res) => {
    const category = req.query.category;
    getBranchByCategory(category).then(data => res.json(data))
  });

  router.get('/service/days', async (req, res) => {
    const day = req.query.day;
    getBranchByDay(req.query.day).then(data => res.json(data))
  });

  router.get('/service/borough', async (req, res) => {
    const borough = req.query.boroughName;
    getBranchByBorough(borough).then(data => res.json(data))
  });
}
