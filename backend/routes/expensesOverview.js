const overviewRouter = require('express').Router()
const FamilyPlan = require('../models/FamilyPlan')
const User = require('../models/User')
const Expense = require('../models/Expense')
const mongoose = require('mongoose')
const { isAuthenticated } = require('../utils/middleware')

overviewRouter.get('/personal-expenses', isAuthenticated, async (req, res) => {
  const expenses = await Expense.find({
    user: mongoose.Types.ObjectId(req.user.id),
  })
  res.status(200).json(expenses)
})

overviewRouter.get('/family-plans', isAuthenticated, async (req, res) => {
  const expense = await Expense.find({
    user: mongoose.Types.ObjectId(req.user.id),
    isPersonal: false,
  })
  res.status(200).json(expense)
})

module.exports = overviewRouter
