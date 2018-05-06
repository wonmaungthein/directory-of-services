import express from 'express';
import { postOrganisation, editOrganisation } from '../controllers/post_controller';
import { seedData } from '../controllers/postInitialData';

import {
  getAllOrgainisation,
  getListOfCategories,
  getListOfBoroughs,
  getListOfAreas,
  getBranchesByCategory,
  getBranchesByDay,
  getBranchesByBorough
} from '../controllers/get_controller';

const router = express.Router();

router.post('/', (req, res) => {
  const query = req.body;
  postOrganisation(query).then(responce => res.json(responce));
});

router.patch('/organisation/:orgId/upsert', async (req, res) => {
  const { orgId } = req.params;
  const data = req.body;
  const graph = {
    id: orgId,
    org_name: data.org_name,
    website: data.website,
    branch: [
      {
        id: data.id,
        org_id: data.org_id,
        borough: data.borough,
        address: [
          {
            id: data.id,
            branch_id: data.branch_id,
            address_line: data.address_line,
            area: data.area,
            postcode: data.postcode,
            email_address: data.email_address,
            telephone: data.telephone,
            location: [
              {
                id: data.id,
                address_id: data.address_id,
                lat: data.lat,
                long: data.long
              }
            ]
          }
        ],
        service: [
          {
            id: data.id,
            branch_id: data.branch_id,
            service_days: data.service_days,
            process: data.process,
            categories: [
              {
                id: data.id,
                service_id: data.service_id,
                cat_name: data.cat_name
              }
            ]
          }
        ]
      }
    ]
  }

  try {
    await editOrganisation(graph, orgId)
      .then(() => res.json({
        success: true, message: 'The organisation has been Saved successfully'
      }))
  } catch (err) {
    res.json({ success: false, message: 'The organisation did not Save!', err })
  }
})

router.get('/all', async (req, res) => {
  try {
    await getAllOrgainisation().then(services =>
      res.json(services));
  } catch (err) {
    res.json(err)
  }
});
router.get('/migrate', async (req, res) => {
  try {
    await seedData().then(() =>
      res.json({ Migration: 'Data migration to database completed successfully !' }));
  } catch (err) {
    res.json(err)
  }
});

router.get('/categories', async (req, res) => {
  try {
    await getListOfCategories().then(categories =>
      res.json(categories));
  } catch (err) {
    res.json(err)
  }
});

router.get('/boroughs', async (req, res) => {
  try {
    getListOfBoroughs().then(boroughs =>
      res.json(boroughs));
  } catch (err) {
    res.json(err)
  }
});

router.get('/areas', async (req, res) => {
  try {
    await getListOfAreas().then(areas =>
      res.json(areas));
  } catch (err) {
    res.json(err)
  }
});

router.get('/category', async (req, res) => {
  try {
    const { category } = req.query;
    await getBranchesByCategory(category)
      .then(categories =>
        res.json(categories))
  } catch (err) {
    res.json(err)
  }
});

router.get('/day', async (req, res) => {
  try {
    const { day } = req.query;
    await getBranchesByDay(day).then(days =>
      res.json(days));
  } catch (err) {
    res.json(err)
  }
});

router.get('/borough', async (req, res) => {
  try {
    const { borough } = req.query;
    await getBranchesByBorough(borough).then(boroughs =>
      res.json(boroughs));
  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
