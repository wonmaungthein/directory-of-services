import bcrypt from 'bcrypt';
import { transaction } from 'objection';
import Users from '../model/Users';

module.exports = {

  getAllUsers: () => Users.query(),

  getUsersById: userId =>
    Users.query().findById(userId),

  updateUser: (userId, userData) =>
    Users.query().patchAndFetchById(userId, userData),

  deleteUser: userId =>
    Users.query().deleteById(userId),

  getUserByUserName: userName =>
    Users.query().skipUndefined().where('username', userName),

  addUser: userData =>
    transaction(Users.knex(), trx =>
      Users.query(trx)
        .insertGraph(userData)),

  comparePassword: (pass, hash, callBack) =>
    bcrypt.compare(pass, hash, (err, isMatch) => {
      if (err) throw err;
      callBack(null, isMatch)
    })
}
