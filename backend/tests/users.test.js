const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const { MONGO_TEST_URL } = require('../utils/config')

beforeEach(async () => {
  console.log('WHAT DB IS THAT ? ?? ?? ', MONGO_TEST_URL)
  await mongoose.createConnection(MONGO_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

describe('GET /api/users', () => {
  it('should return list of users', async () => {
    const res = await request(app).get('/api/users')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(0)
  })
})

afterEach(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})
