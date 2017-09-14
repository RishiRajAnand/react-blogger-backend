const request = require('supertest');
const app = require('../server/server.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /api/Blog', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api/Blogs')
      .expect(200, done);
  });
});

describe('GET /api/Blogs/count', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api/Blogs/count')
      .expect(200, done);
  });
});

describe('GET/api/Users', () => {
  it('should return 401 OK', (done) => {
    request(app)
      .get('/api/Users')
      .expect(401, done);
  });
});

describe('GET /api/Bloggers', () => {
  it('should return 401 OK', (done) => {
    request(app)
      .get('/api/Bloggers')
      .expect(401, done);
  });
});


