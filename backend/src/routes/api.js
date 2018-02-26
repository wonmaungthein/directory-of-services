
import { Add }  from '../controler/dml'

module.exports = router => {
  router.post('/add', (req, res) => {
    const data = req.body;
    res.send(Add(data));
  });
}
