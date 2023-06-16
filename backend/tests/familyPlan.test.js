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

describe('GET /api/family-plan', () => {
  it('Plan is retrieved by the user', async () => {
    const { token, user } = await createUserAndToken()
    const plan = new FamilyPlan({
      users: [user._id],
      planName: 'name',
      created_by: user._id,
    })
    await plan.save()

    const res = await request(app)
      .get(`/family-plan/plans/${plan._id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.planName).toEqual(plan.planName)
  })

  it('Test get plan while no being in it', async () => {
    const { user } = await createUserAndToken()
    const user2 = await createUserAndToken()

    const plan = new FamilyPlan({
      users: [user._id],
      planName: 'name',
      created_by: user._id,
    })
    await plan.save()

    const res = await request(app)
      .get(`/family-plan/plans/${plan._id}`)
      .set('Authorization', `Bearer ${user2.token}`)

    expect(res.statusCode).toBe(403)
  })

  it('Test posting expense to the plan', async () => {
    const { token, user } = await createUserAndToken()
    const plan = new FamilyPlan({
      users: [user._id],
      planName: 'name',
      created_by: user._id,
    })
    await plan.save()

    const body = {
      title: 'Groceries',
      type: 'Essentials',
      amountSpent: 322,
      user: user._id,
    }

    const res = await request(app)
      .post(`/family-plan/plans/${plan._id}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`)

    const updatedPlan = await FamilyPlan.findById(plan._id)

    const id = updatedPlan.expenses[0]

    expect(res.statusCode).toBe(201)
    expect(updatedPlan.expenses.length).toEqual(1)
    expect(id == res.body.id).toBe(true)
  })
})

afterEach(async () => {
  await mongoose.connection.close()
})
