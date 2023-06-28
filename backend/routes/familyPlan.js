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

function isUserInPlan(req, plan) {
  const userId = req.user?.id
  return plan.users.includes(userId)
}

familyPlanRouter.get('/plans/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const plan = await FamilyPlan.findById(id).populate({
    path: 'expenses',
    populate: { path: 'user', model: 'User' },
  })

  const userId = req.user?.id
  if (!plan.users.includes(userId)) {
    return res.status(403).send({ error: 'Unauthenticated' })
  }

  res.json(plan)
})

familyPlanRouter.post('/plans/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params
  const plan = await FamilyPlan.findById(id)

  if (!isUserInPlan(req, plan)) {
    return res.status(403).send({ error: 'Unauthenticated' })
  }

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

    const populatedExpense = await savedExpense.populate('user').execPopulate()

    plan.expenses.push(savedExpense._id)
    await plan.save()

    res.status(201).json(populatedExpense)
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

familyPlanRouter.patch(
  '/plans/:id/:expenseId',
  isAuthenticated,
  async (req, res) => {
    const { id, expenseId } = req.params
    const plan = await FamilyPlan.findById(id)

    if (!isUserInPlan(req, plan)) {
      return res.status(403).send({ error: 'Unauthenticated' })
    }

    const expense = plan.expenses.find((e) => e.toString() === expenseId)

    if (expense) {
      const update = {
        title: req.body.title,
        amountSpent: req.body.amountSpent,
        type: req.body.type,
        date: req.body.date || new Date(),
      }

      const toUpdate = await Expense.findOneAndUpdate(
        { _id: expenseId },
        update,
        {
          new: true,
        }
      )

      return res.status(200).json(toUpdate)
    }

    res
      .status(400)
      .json({ error: 'Did not find the expenses with given params' })
  }
)

familyPlanRouter.delete(
  '/plans/:id/:expenseId',
  isAuthenticated,
  async (req, res) => {
    // TODO: Add tests for that
    const { id } = req.params
    const plan = await FamilyPlan.findById(id).populate('expenses')

    if (!isUserInPlan(req, plan)) {
      return res.status(403).send({ error: 'Unauthenticated' })
    }

    const qExpenseId = req.params.expenseId
    const expense = plan.expenses.find((e) => e.id === qExpenseId)
    if (expense) {
      await expense.remove()
      plan.expenses = plan.expenses.filter((e) => e.id !== qExpenseId)
      await plan.save()
      res.status(204).json({})
    }
  }
)

module.exports = familyPlanRouter
