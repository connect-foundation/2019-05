require('dotenv').config({ path: '.env.development' });
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('/myteam endpoint test', () => {
  it('GET /myteam should work', () => {
    expect(true).toBeTruthy();
  });
});

describe('/user endpoint test', () => {
  it('GET /user should work', () => {
    expect(true).toBeTruthy();
  });
});
