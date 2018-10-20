import request from 'supertest';
import { expect } from 'chai';

import app from '../src/app';

describe('API testing', async () => {
  it('should return list of organisation in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/all')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of categories in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/categories')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of boroughs in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/boroughs')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of areas in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/areas')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of boroughs filtered by category in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/category/?category=Education')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of boroughs filtered by day in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/day/?day=Monday')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(result.body).to.be.a('array');
  });

  it('should return list of boroughs filtered by borough in JSON format', async () => {
    const result = await request(app)
      .get('/api/service/borough/?borough=Bexley')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(result.body).to.be.a('array');
  });

  it('should not save unless correct data has been supplied', async () => {
    const postcode = { lat: 'nw78', long: '657858' };
    const result = await request(app)
      .post('/api/service/postcode')
      .send(postcode);
    expect(result.statusCode).to.be.equal(200);
    expect(result.body.success).to.equal(true)
    expect(result.body.message).to.be.equal('The Postcode has been saved successfully');
  });

  it('should save with right data', async () => {
    const anOrg = {
      organisation: 'testOrg',
      categories: 'Benefit'
    };
    const result = await request(app)
      .post('/api/service/organisation/add')
      .send(anOrg);
    expect(result.statusCode).to.be.equal(200);
    expect(result.body.success).to.equal(true);
    expect(result.body.message).to.be.equal('The organisation has been saved successfully');
  });
});

