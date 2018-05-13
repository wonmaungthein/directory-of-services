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

router.post('/organisation/add', async (req, res) => {
  const data = req.body;
  const graph = {
    org_name: data.organisation,
    website: data.website || '',
    branch: {
      borough: data.borough || '',
      project: data.project || '',
      tag: data.tag || '',
      service: [
        {
          service: data.service || '',
          service_days: data.days || '',
          process: data.process || '',
          categories: [
            {
              cat_name: data.categories
            }
          ]
        }
      ],
      address: [
        {
          area: data.area || '',
          address_line: data.address || '',
          postcode: data.postcode || '',
          email_address: data.email || '',
          telephone: data.tel || '',
          location: [
            {
              lat: data.lat || '',
              long: data.long || ''
            }
          ]
        }
      ]
    }
  }

  try {
    await postOrganisation(graph)
    res.status(200).json({
      success: true,
      message: 'The organisation has been saved successfuly'
    })
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'The organisation did not save!',
      err
    })
  }
})

router.patch('/organisation/edit', async (req, res) => {
  const { branchId } = req.body;
  const { orgId } = req.body;
  const data = req.body;
  const graph = {
    id: orgId,
    org_name: data.organisation,
    website: data.website,
    branch: [
      {
        id: branchId,
        org_id: orgId,
        borough: data.borough,
        address: [
          {
            address_line: data.address,
            area: data.area,
            postcode: data.postcode,
            email_address: data.email,
            telephone: data.Tel,
            location: [
              {
                lat: data.lat,
                long: data.long
              }
            ]
          }
        ],
        service: [
          {
            service_days: data.days,
            process: data.process,
            categories: [
              {
                cat_name: data.categories
              }
            ]
          }
        ]
      }
    ]
  }

  try {
    await editOrganisation(graph, orgId, branchId)
      .then(() => res.json({
        success: true, message: 'The organisation has been updated successfully'
      }))
  } catch (err) {
    res.json({ success: false, message: 'The organisation did not update!', err })
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
