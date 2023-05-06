const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const { MONGO_TEST_URL, MONGODB_URI } = require('../utils/config')
const Expense = require('../models/Expense')
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
  await Expense.deleteMany({})
  await User.deleteMany({})
})

describe('GET /api/personal-plan', () => {
  it('should return empty list', async () => {
    const res = await request(app).get('/personal-plan')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(0)
  })

  it('Should return a plan with expenses', async () => {
    const user = new User({
      username: 'username',
      email: 'a@gmail.com',
      name: 'Name',
      passwordHash: 'Hashssss',
    })
    await user.save()
    const expense = new Expense({
      title: 'TITLE',
      type: 'MY TYPE',
      amountSpent: 30,
      user: user._id,
      date: '2022-12-12',
    })
    await expense.save()
    expect(user).toBeDefined()

    const res = await request(app).get('/personal-plan')
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
  })
})

afterEach(async () => {
  await mongoose.connection.close()
})
