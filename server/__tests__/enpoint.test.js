require('dotenv').config({ path: '.env.development' });
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('/mail endpoint test', () => {
  it('GET /mail should work', async (done) => {
    const response = await request.get('/mail');
    expect(response.body.result).toBe('ok');
    done();
  });
  it('POST /mail should work', async (done) => {
    const response = await request.post('/mail');
    expect(response.body.result).toBeUndefined();
    done();
  });
});

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
