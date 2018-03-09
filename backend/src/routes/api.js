
import { Insert, Select } from '../controllers/dml';

module.exports = router => {
  router.post('/insert', (req, res) => {
    const query = req.body;
    console.info(query);
    Insert(query)
  });
  router.get('/organisation', (req, res) => {
    Select().then(data => res.json(data));
  });
}
