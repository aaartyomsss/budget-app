const familyPlanRequestRouter = require('express').Router()
const { json } = require('express')
const FamilyPlanRequest = require('../models/FamilyPlanRequest')
const FamilyPlan = require('../models/FamilyPlan')
const User = require('../models/User')
const { isAuthenticated } = require('../utils/middleware')

const REQUEST_SENT = 'SENT'
const REQUEST_ACCEPTED = 'ACCEPTED'
const REQUEST_DECLINED = 'DECLINED'

familyPlanRequestRouter.post(
  '/send-request',
  isAuthenticated,
  async (req, res) => {
    const { requester, planName, recepientId, planId } = req.body
    const recepient = await User.findById(recepientId)
    const plan = await FamilyPlan.findById(planId)

    if (!recepient) {
      return res.status(403).json({ error: 'User was not found' })
    }

    const userId = req.user?.id
    if (!plan.users.includes(userId)) {
      return res.status(403).send({ error: 'You do not belong to the plan' })
    }

    if (plan.users.includes(recepientId)) {
      return res
        .status(400)
        .send({ error: 'Person has already been added to the plan' })
    }

    try {
      const request = new FamilyPlanRequest({
        status: REQUEST_SENT,
        recepient: recepient._id,
        requester,
        planName,
        planId,
      })

      await request.save()
      res.json(request)
    } catch (e) {
      res.json({ error: e.message })
    }
  }
)

familyPlanRequestRouter.get('/sent-requests/:id', async (req, res) => {
  const requester = req.params.id
  const requests = await FamilyPlanRequest.find({ requester })
  res.json(requests)
})

familyPlanRequestRouter.get('/avaiting-response/:id', async (req, res) => {
  const recepient = req.params.id
  const requests = await FamilyPlanRequest.find({
    recepient,
    status: REQUEST_SENT,
  }).populate('requester')
  res.json(requests)
})

familyPlanRequestRouter.get('/requests/:id', async (req, res) => {
  const userId = req.params.id
  const requests = await FamilyPlanRequest.find({ recepient: userId })
  res.json(requests)
})

// Uses request's id as an url param
familyPlanRequestRouter.patch('/request-response/:id', async (req, res) => {
  const { answer, userId } = req.body
  if (!answer) {
    return res.status(400).json({ error: 'No answer was provided' })
  }

  try {
    const request = await FamilyPlanRequest.findOneAndUpdate(
      { _id: req.params.id },
      { status: answer },
      { new: true }
    )
    if (answer === REQUEST_ACCEPTED) {
      try {
        const plan = await FamilyPlan.findById(request.planId)
        const user = await User.findById(userId)
        plan.users = plan.users.concat(user._id)
        user.familyPlans = user.familyPlans.concat(plan._id)
        await plan.save()
        await user.save()
        res.json(plan)
      } catch (error) {
        res.json({ error: error.message })
      }
    } else if (answer === REQUEST_DECLINED) {
      return res.status(200).json(null)
    }
  } catch (e) {
    return res.status(403).json({ error: 'Request was not found ' })
  }
  // TODO Add cancelation of a request
})

module.exports = familyPlanRequestRouter
