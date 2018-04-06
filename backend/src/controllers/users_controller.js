import bcrypt from 'bcrypt';
import { knex } from '../../config';

module.exports = {

  getAllUsers: () => knex('Users'),

  getUsersById: userId => knex('Users').where('id', userId).first(),

  addUser: userData => knex('Users').insert(userData, '*'),

  updateUser: (userId, userData) => knex('Users').where('id', userId).update(userData),

  deleteUser: userId => knex('Users').where('id', userId).del(),

  getUserByUserName: userName => knex('Users').where({ username: userName }, '*').first(),

  comparePassword: (pass, hash, callBack) =>
    bcrypt.compare(pass, hash, (err, isMatch) => {
      if (err) throw err;
      callBack(null, isMatch)
    })
}
