import bcrypt from 'bcrypt';
import { transaction } from 'objection';
import Users from '../model/Users';

module.exports = {

  getAllUsers: () => Users.query(),

  getUsersById: userId =>
    Users.query().findById(userId),

  updateUser: (userId, userData) =>
    Users.query().skipUndefined().patch(userData).where('id', userData[userId])
      .returning('*'),

  deleteUser: userId =>
    Users.query().deleteById(userId),

  getUserByEmail: email =>
    Users.query().skipUndefined().where('email', email),

  validateResetInfo: (token, dateValue) =>
    Users.query().skipUndefined()
      .where('resetPasswordToken', token)
      .andWhere('resetPasswordExpires', '>', dateValue),

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
