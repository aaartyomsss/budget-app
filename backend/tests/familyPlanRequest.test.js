const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')
const { MONGODB_URI } = require('../utils/config')
const Expense = require('../models/Expense')
const User = require('../models/User')
const FamilyPlan = require('../models/FamilyPlan')
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
  await FamilyPlan.deleteMany({})
})

describe('GET /api/family-plan-request', () => {
  it('Request can be sent', async () => {
    const { token, user } = await createUserAndToken()
    const plan = new FamilyPlan({
      users: [user._id],
      planName: 'name',
      created_by: user._id,
    })
    await plan.save()

    const user2 = await createUserAndToken()

    const payload = {
      recepientId: user2.user._id,
      planId: plan._id,
      requester: user._id,
      planName: plan.planName,
    }

    const res = await request(app)
      .post(`/family-plan-request/send-request`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.planName).toEqual(plan.planName)

    expect(res.body.recepient === user2.user._id.toString()).toEqual(true)
  })

  it('Request cannot be send to the user, which is already in the plan', async () => {
    const { token, user } = await createUserAndToken()
    const user2 = await createUserAndToken()
    const plan = new FamilyPlan({
      users: [user._id, user2.user._id],
      planName: 'name',
      created_by: user._id,
    })
    await plan.save()

    const payload = {
      recepientId: user2.user._id,
      planId: plan._id,
      requester: user._id,
      planName: plan.planName,
    }

    const res = await request(app)
      .post(`/family-plan-request/send-request`)
      .send(payload)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(400)
  })
})

afterEach(async () => {
  await mongoose.connection.close()
})
