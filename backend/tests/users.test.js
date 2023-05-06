const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const User = require('../models/User')

beforeEach(async () => {
  await mongoose.disconnect()
  await mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database: ', MONGODB_URI)
    })
    .catch((e) => {
      console.log('Database init error: ', e.message)
    })
  await User.deleteMany({})
})

describe('GET /api/users', () => {
  it('should return empty list', async () => {
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(0)
  })

  it('Should return a user', async () => {
    const user = new User({
      username: 'Username',
      name: 'Name',
      email: 'Email',
      passwordHash: 'veryFakeHash',
    })
    await user.save()
    const res = await request(app).get('/users')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
    expect(res.body[0].username).toBe(user.username)
  }, 100000)
})

afterEach(async () => {
  await mongoose.connection.close()
}, 100000)
