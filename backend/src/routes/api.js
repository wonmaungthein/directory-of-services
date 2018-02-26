
import { transaction } from 'objection';
import Organisation from '../models/Organisation';

const knex = Organisation.knex();

// const addOrganisation = data => {
//   let trx;
//   try {
//     trx = await transaction.start(knex);
//     const organisation = await Organisation
//       .query(trx)
//       .insert(data);
//     await trx.commit();
//     return data;
//   } catch (err) {
//     await trx.rollback();
//     console.log('Something went wrong. Data is not inserted');
//   }
// }

module.exports = router => {
  router.post('/add', async (req, res) => {
    const data = req.body;
    let trx
    try {
      trx = await transaction.start(knex);
      const organisation = await Organisation
        .query(trx)
        .insert(data);
      await trx.commit();
      res.send(organisation);
    } catch (err) {
      await trx.rollback();
      console.log('Something went wrong. Data is not inserted', err);
    }
  });
}
