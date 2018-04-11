
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

  router.get('/service/all', (req, res) => {
    getAllOrgainisation().then((err, services) => {
      if (err) {
        res.json(err)
      } else {
        res.json(services)
      }
    });
  });
  
  router.get('/service/migrate', (req, res) => {
    seedData().then((err) => {
      if (err) {
        res.json(err)
      } else {
        res.json({ Migration: 'Data migration to database completed successfully !' })
      }
    });
  });

  router.get('/service/categories', (req, res) =>
    getListOfCategories().then((err, categories) => {
      if (err) {
        res.json(err)
      } else {
        res.json(categories)
      }
    }));

  router.get('/service/boroughs', (req, res) =>
    getListOfBoroughs().then((err, boroughs) => {
      if (err) {
        res.json(err)
      } else {
        res.json(boroughs)
      }
    }));

  router.get('/service/areas', (req, res) =>
    getListOfAreas().then((err, areas) => {
      if (err) {
        res.json(err)
      } else {
        res.json(areas)
      }
    }));
}
