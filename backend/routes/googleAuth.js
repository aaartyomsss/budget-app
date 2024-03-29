const googleRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

googleRouter.post('/', async (req, res) => {
  const body = req.body
  let user = await User.findOne({ email: body.email }).populate('personalPlan')

  if (user) {
    const token = jwt.sign(user.toJSON(), config.SECRET)
    res.send({
      token,
      googleId: user.googleId,
      email: user.email,
      name: user.name,
      id: user._id,
      personalPlan: user.personalPlan,
      familyPlans: user.familyPlans,
      username: user.username,
    })
  } else {
    user = new User({
      googleId: body.googleId,
      email: body.email,
      username: body.email,
      name: body.name,
      image: body.imageUrl,
      confirmed: true,
    })

    await user.save()

    const token = jwt.sign(user.toJSON(), config.SECRET)

    try {
      res.send({
        token,
        googleId: user.googleId,
        email: user.email,
        name: user.name,
        username: user.username,
        id: user._id,
      })
    } catch (e) {
      console.error(e.message)
      res.json({ e: e.message })
    }
  }
})

module.exports = googleRouter
