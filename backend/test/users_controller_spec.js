import { expect } from 'chai'
import {
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUsersById,
  getUserByEmail
} from '../src/controllers/users_controller'

describe('Test users controller functions', () => {
  it('Should get list of users and at least includes one user', async () => {
    const result = await getAllUsers();
    expect(result).to.be.a('array')
    expect(result.length).to.be.at.least(1)
  })

  it('Should find a user info by using his/her id', async () => {
    const userId = 1;
    const result = await getUsersById(userId);
    expect(result).to.be.a('object')
    expect(result.id).to.equal(1)
  })

  it('Should edit a user info', async () => {
    const userData = {
      email: 'mohammed@hotmail.com',
      organisation: 'CYF',
      fullname: 'Mohammed',
      salt_password: '1234'
    }
    const userId = 4;
    const result = await updateUser(userId, userData);
    expect(result).to.be.a('number')
    expect(result).to.equal(1)
  })

  it('Should delete a user info', async () => {
    const userId = 3;
    const result = await deleteUser(userId);
    expect(result).to.be.a('number')
    expect(result).to.equal(1)
  })

  it('Should find a user info by using his/her email', async () => {
    // you need to update the email as you expect this test only pass at my local code
    // so you need to update this email you email expectation
    const email = 'mohammed@hotmail.com';
    const result = await getUserByEmail(email);
    expect(result).to.be.a('array')
    expect(result[0].email).to.equal(email)
  })

  it('Should add new user', async () => {
    const userData = {
      email: 'test@hotmail.com',
      organisation: 'CYF',
      fullname: 'test',
      salt_password: '1234'
    }
    const result = await addUser(userData);
    expect(result).to.be.a('object')
    expect(result.email).to.equal(userData.email)
  })

})
