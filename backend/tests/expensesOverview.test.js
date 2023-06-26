const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const Expense = require('../models/Expense')
const User = require('../models/User')
const { createUserAndToken } = require('./testUtils')

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

describe('GET /api/overview/<endpoints>', () => {
  it('Test unauthenticated', async () => {
    const user = new User({
      username: 'username',
      email: 'a@gmail.com',
      name: 'Name',
      passwordHash: 'Hashssss',
      confirmed: true,
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

    const res = await request(app).get('/overview/personal-expenses')
    expect(res.statusCode).toBe(403)
  })

  it('Test getting an expense as a user', async () => {
    const { token, user } = await createUserAndToken()
    const expense = new Expense({
      title: 'TITLE',
      type: 'MY TYPE',
      amountSpent: 30,
      user: user._id,
      date: '2022-12-12',
    })

    await expense.save()

    const res = await request(app)
      .get('/overview/personal-expenses')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
  })

  it('Returns multiple expenses both from personal and family plans', async () => {
    const { token, user } = await createUserAndToken()
    const expense = new Expense({
      title: 'TITLE',
      type: 'MY TYPE',
      amountSpent: 30,
      user: user._id,
      date: '2022-12-12',
    })

    const expense2 = new Expense({
      title: 'TITLE2',
      type: 'MY TYPE2',
      amountSpent: 301,
      user: user._id,
      date: '2022-02-12',
      isPersonal: false,
    })

    await expense.save()
    await expense2.save()

    const res = await request(app)
      .get('/overview/personal-expenses')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(2)
  })

  it('Return only family expenses', async () => {
    const { token, user } = await createUserAndToken()
    const expense = new Expense({
      title: 'TITLE',
      type: 'MY TYPE',
      amountSpent: 30,
      user: user._id,
      date: '2022-12-12',
    })

    const expense2 = new Expense({
      title: 'TITLE2',
      type: 'MY TYPE2',
      amountSpent: 301,
      user: user._id,
      date: '2022-02-12',
      isPersonal: false,
    })

    await expense.save()
    await expense2.save()

    const res = await request(app)
      .get('/overview/family-plans')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(1)
  })
})

afterEach(async () => {
  await mongoose.connection.close()
})
