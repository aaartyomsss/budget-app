const personalPlan = require('express').Router()
const Expense = require('../models/Expense')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { isAuthenticated } = require('../utils/middleware')
const mongoose = require('mongoose')

// for fetching
personalPlan.get('/', isAuthenticated, async (req, res) => {
  const userId = req.user?.id
  const expenses = await Expense.find({
    user: mongoose.Types.ObjectId(userId),
    isPersonal: true,
  })
  res.json(expenses)
})

// Get single expense
personalPlan.get('/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id)
  res.json(expense)
})

// Adding new expense to personal plan
personalPlan.post('/', async (req, res) => {
  const body = req.body

  const decoded = jwt.verify(req.token, config.SECRET)
  // Helper function return either google or a regular user to avoid code repetition
  const user = await User.findById(decoded.id)
  try {
    const newExpense = new Expense({
      title: body.title,
      type: body.type,
      amountSpent: body.amountSpent,
      user: user._id,
      date: body.date || new Date(),
    })

    const savedExpense = await newExpense.save()
    user.personalPlan = user.personalPlan.concat(savedExpense._id)
    await user.save()
    res.status(201).json(savedExpense)
  } catch (error) {
    res.status(400).json({ error: error?._message || 'Error occured' })
  }
})

// Updating/ Changing expenses info
personalPlan.patch('/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const update = {
    title: req.body.title,
    amountSpent: req.body.amountSpent,
    type: req.body.type,
    date: req.body.date || new Date(),
  }

  const toUpdate = await Expense.findOneAndUpdate(filter, update, {
    new: true,
  })

  return res.json(toUpdate)
})

// Deleting
personalPlan.delete('/:id', async (req, res) => {
  const decodedUser = jwt.verify(req.token, config.SECRET)
  if (!decodedUser) {
    return res.status(401).json({ error: 'Unathorized attempt to delete' })
  }

  const toDelete = await Expense.findById(req.params.id)
  const user = await User.findById(decodedUser.id)
  if (toDelete.user.toString() === user.id.toString() && toDelete.isPersonal) {
    const removed = await Expense.remove(toDelete)
    user.personalPlan = user.personalPlan.splice(-1)
    await user.save()
  } else {
    return res.status(403).json({ error: 'Forbidden action' })
  }

  res.status(204).end()
})

module.exports = personalPlan
