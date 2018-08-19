
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app'

describe('Users API testing', () => {
  it('should return list of users', async () => {
    const result = await request(app).get('/api/users')
      .expect('Content-Type', /json/)
    expect(result.body).to.be.a('array')
    expect(result.statusCode).to.equal(200)
  })

  it('Should find a user info by using his/her id', async () => {
    const result = await request(app).get('/api/users/1')
      .expect('Content-Type', /json/);
    expect(result.body).to.be.a('object')
    expect(result.statusCode).to.equal(200)
    expect(result.body.id).to.equal(1)
  })

  it('should add new user', async () => {
    const userData = {
      orgName: 'CYF',
      password: '1234',
      fullname: 'Mohammed',
      email: 'test@testtwo.com'
    }
    const result = await request(app).post('/api/users')
      .send(userData)
      .expect('Content-Type', /json/);
    expect(result.body).to.be.a('object')
    expect(result.statusCode).to.equal(200)
    expect(result.body.fullname).to.equal(userData.fullname)
  })

  it('should add new user', async () => {
    const userData = {
      orgName: 'CYF',
      password: '1234',
      fullname: 'testThree',
      email: 'testthree@testthree.com'
    }
    const result = await request(app).post('/api/signup')
      .send(userData)
      .expect('Content-Type', /json/);
    expect(result.body).to.be.a('object')
    expect(result.statusCode).to.equal(200)
    expect(result.body.success).to.equal(true)
  })

})
