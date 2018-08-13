import request from 'supertest';
import app from '../src/app'

describe('API testing', () => {
  it('should return list of organisation in JSON format', (done) => {
    request(app).get('/api/service/all')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of categories in JSON format', (done) => {
    request(app).get('/api/service/categories')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of boroughs in JSON format', (done) => {
    request(app).get('/api/service/boroughs')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of areas in JSON format', (done) => {
    request(app).get('/api/service/areas')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of boroughs filtered by category in JSON format', (done) => {
    request(app).get('/api/service/category/?category=Education')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of boroughs filtered by day in JSON format', (done) => {
    request(app).get('/api/service/day/?day=Monday')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('should return list of boroughs filtered by borough in JSON format', (done) => {
    request(app).get('/api/service/borough/?borough=Bexley')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
