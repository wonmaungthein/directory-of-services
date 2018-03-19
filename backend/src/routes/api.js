
import { postOrganisation } from '../controllers/post_controller';
import { getAllOrgainisation } from '../controllers/get_controller';
import { loadSeedToDb } from '../controllers/postInitialData';

module.exports = router => {
  router.post('/service', (req, res) => {
    const query = req.body;
    postOrganisation(query).then(responce => res.json(responce));
  });
  router.get('/service/all', (req, res) => {
    getAllOrgainisation().then(data => res.json(data));
  });
  router.get('/service/migrate', (req, res) => {
    loadSeedToDb().then(data => res.json({ Migration: 'Data migration to database completed successfully !' }));
  })
}
