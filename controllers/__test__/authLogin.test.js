const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');

require('dotenv').config();
const { MONGO_URL, PORT = 3000 } = process.env;

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(MONGO_URL);

describe('POST - api/user/login', () => {
  let server;
  beforeAll(() => { mongoose.connect(MONGO_URL).then(() => {
        server = app.listen(PORT);
      })
  });

  afterAll( async() => {
    await server.close();
    await mongoClient.close();
  });

  it('should return user token and status code 200', async () => {
    const testData = {
      email: 'Admin@example.com',
      password: 'Admin123!',
    };
    const response = await request(app).post('/api/users/login').send(testData);

    const { statusCode, body } = response;
    const { user } = body;
    
    expect(statusCode).toBe(200);
    expect(typeof user.email).toBe('string');
    expect(typeof user.subscription).toBe('string');
    expect(body).toEqual(expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
    }));
  });

  it('should return unauthorized 401 error - wrong Login', async () => {
    const testData = {
      email: 'Admin1111@example.com',
      password: 'Admin123!',
    };
    const response = await request(app).post('/api/users/login').send(testData);
    expect(response.statusCode).toBe(401);
  });
    
  it('should return unauthorized 401 error - wrong Password', async () => {
      const testData = {
            email: 'Admin@example.com',
            password: 'Admin123!1111',
        };
      const response = await request(app)
            .post('/api/users/login')
            .send(testData);
      expect(response.statusCode).toBe(401);
      console.dir(response);
  });
});
