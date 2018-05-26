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

  getUserByEmail: email =>
    Users.query().skipUndefined().where('email', email),

  addUser: userData =>
    transaction(Users.knex(), trx =>
      Users.query(trx)
        .insertGraph(userData)),

  comparePassword: (password, hash, callBack) =>
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) throw err;
      callBack(null, isMatch)
    })
}
