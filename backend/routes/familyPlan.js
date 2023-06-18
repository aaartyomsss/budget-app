const familyPlanRouter = require('express').Router()
const FamilyPlan = require('../models/FamilyPlan')
const Expense = require('../models/Expense')
const User = require('../models/User')
const { isAuthenticated } = require('../utils/middleware')

familyPlanRouter.get('/plans', isAuthenticated, async (req, res) => {
  const userId = req.user?.id
  const plans = await FamilyPlan.find({ users: userId }).populate('expenses')
  res.json(plans)
})

familyPlanRouter.get('/plans/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const plan = await FamilyPlan.findById(id).populate('expenses')

  const userId = req.user?.id
  if (!plan.users.includes(userId)) {
    return res.status(403).send({ error: 'Unauthenticated' })
  }

  res.json(plan)
})

familyPlanRouter.post('/plans/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const plan = await FamilyPlan.findById(id)

  const userId = req.user?.id
  if (!plan.users.includes(userId)) {
    return res.status(403).send({ error: 'Unauthenticated' })
  }

  const body = req.body

  try {
    const newExpense = new Expense({
      title: body.title,
      type: body.type,
      amountSpent: body.amountSpent,
      user: userId,
      date: body.date,
      isPersonal: false,
    })
    const savedExpense = await newExpense.save()

    plan.expenses.push(savedExpense._id)
    await plan.save()

    res.status(201).json(newExpense)
  } catch (error) {
    res.status(500).json({ error })
  }
})

familyPlanRouter.post('/initialize-plan', async (req, res) => {
  const { planName, userId } = req.body
  const user = await User.findById(userId)
  const newFamilyPlan = new FamilyPlan({
    users: [user.id],
    planName,
    created_by: userId,
  })
  try {
    const saved = await newFamilyPlan.save()
    user.familyPlans = user.familyPlans.concat(saved._id)
    await user.save()
    res.json(newFamilyPlan)
  } catch (error) {
    res.json({ error })
  }
})

//TODO add addition, updating, deletition of expenses

module.exports = familyPlanRouter
