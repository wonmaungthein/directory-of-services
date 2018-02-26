
import { Insert, Select }  from '../controler/dml';

module.exports = router => {
  router.post('/insert', (req, res) => {
    const query = req.body;
    res.json(Insert(query));
  });
  router.get('/organisation', (req, res) => {
    Select().then(data => res.json(data));
  });
}
