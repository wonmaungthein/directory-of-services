
import { postOrganisation } from '../controllers/post_controller';
import { getAllOrgainisation } from '../controllers/get_controller';

module.exports = router => {
  router.get('/', (req, res) => {
    res.send('Blank Route');
  });
  router.post('/post', (req, res) => {
    const query = req.body;
    postOrganisation(query).then(responce => res.json(responce));
  });
  router.get('/org', (req, res) => {
    getAllOrgainisation().then(data => res.json(data));
  });
}
