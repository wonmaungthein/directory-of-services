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
        borough: data.borough,
        project: data.project,
        tag: data.tag,
        address: [
          {
            id: data.addressId,
            address_line: data.address,
            area: data.area,
            postcode: data.postcode,
            email_address: data.email,
            telephone: data.tel,
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
            id: data.serviceId,
            service_days: data.days,
            service: data.service,
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
    return res.status(200).json({
      success: true,
      message: 'The organisation has been updated successfully',
      data
    })
  } catch (err) {
    return res.status(502).json({
      success: false,
      message: 'The organisation did not save!',
      err
    });
  }
})

router.get('/all', async (req, res) => {
  try {
    await getAllOrgainisation().then(services =>
      res.status(200).json(services));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/migrate', async (req, res) => {
  try {
    await seedData().then(() =>
      res.status(200).json({ Migration: 'Data migration to database completed successfully !' }));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/categories', async (req, res) => {
  try {
    await getListOfCategories().then(categories =>
      res.status(200).json(categories));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/boroughs', async (req, res) => {
  try {
    getListOfBoroughs().then(boroughs =>
      res.status(200).json(boroughs));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/areas', async (req, res) => {
  try {
    await getListOfAreas().then(areas =>
      res.status(200).json(areas));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/category', async (req, res) => {
  try {
    const { category } = req.query;
    await getBranchesByCategory(category)
      .then(categories =>
        res.status(200).json(categories))
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/day', async (req, res) => {
  try {
    const { day } = req.query;
    await getBranchesByDay(day).then(days =>
      res.status(200).json(days));
  } catch (err) {
    res.status(502).json(err)
  }
});

router.get('/borough', async (req, res) => {
  try {
    const { borough } = req.query;
    await getBranchesByBorough(borough).then(boroughs =>
      res.status(200).json(boroughs));
  } catch (err) {
    res.status(502).json(err)
  }
});

module.exports = router;
