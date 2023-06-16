const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
require('dotenv/config')
const nodemailer = require('nodemailer')
const confiramtionUrl = `${config.FRONTEND_BASE_URL}api/users/confirmation`

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map((user) => user.toJSON()))
})

userRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    'personalPlan familyPlans'
  )
  res.json(user)
})

// verification
userRouter.get('/confirmation/:token', async (req, res) => {
  const token = req.params.token
  const decodedUser = jwt.verify(token, process.env.EMAIL_TOKEN)
  if (!decodedUser) {
    return res.status(404).json({ error: 'Something went wrong' })
  }
  const user = await User.findById(decodedUser.id)
  user.confirmed = true
  try {
    await user.save()
    res.redirect(`${config.FRONTEND_BASE_URL}activated`)
  } catch (error) {}
})

// Reseting password from user options
userRouter.patch('/reset-password', async (req, res) => {
  const body = req.body
  if (!body.currentPassword || !body.newPassword) {
    return res.status(400).json({ error: 'Please fill all required fields ' })
  }

  const user = await User.findOne({ username: body.username })
  if (!user) {
    return res.status(404).json({ error: 'User was not found' })
  }

  const passwordValidation = await bcrypt.compare(
    body.currentPassword,
    user.passwordHash
  )
  if (!passwordValidation) {
    return res.status(401).json({ error: 'Invalid current password' })
  }

  const newPasswordHash = await bcrypt.hash(
    body.newPassword,
    parseInt(config.SALT_ROUNDS)
  )

  try {
    await User.updateOne(
      { _id: user._id },
      { $set: { passwordHash: newPasswordHash } }
    )
    return res
      .status(200)
      .json({ message: 'Password was successfully changed ' })
  } catch (error) {
    return res.status(400).json({
      error: `Error occured while saving new password ${error.message}`,
    })
  }
})

// Registration
userRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.name || !body.username || !body.password || !body.email) {
    return res.status(400).json({ error: 'Please fill all required fields' })
  }
  if (body.password.length < 6) {
    return res.status(400).json({ error: 'password length is less than 6' })
  }
  if (body.username.length < 3) {
    return res.status(400).json({ error: 'password length is less than 3' })
  }

  const passwordHash = await bcrypt.hash(
    body.password,
    parseInt(config.SALT_ROUNDS)
  )

  try {
    const user = new User({
      username: body.username,
      name: body.name,
      email: body.email,
      passwordHash,
    })

    const savedUser = await user.save()

    const emailToken = jwt.sign(user.toJSON(), config.EMAIL_TOKEN)

    // Sending email block of code
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD,
      },
    })

    const html = `<p>Thank you for your registration</p><p>By clicking following link you will activate your account</p><p><p><a>${confiramtionUrl}/${emailToken}</a></p>`
    console.log(process.env.NODE_ENV, process.env.NODE_ENV === 'dev')
    if (process.env.NODE_ENV === 'dev') {
      console.log('------------------')
      console.log(html)
      console.log('------------------')
    }

    const mailOptions = {
      from: '"Test Budget App" <noreplyconfirmationtest@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Confirm your account', // Subject line
      text: `Hi, ${user.name}`, // plain text body
      html,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Email sent: ', info.response)
      }
    })

    res.json(savedUser)
  } catch (error) {
    return res.json({ error: error.message })
  }
})

// TODO: This should be fixed
userRouter.get('/search/:query', async (req, res) => {
  const query = req.params.query
  User.search(
    {
      query_string: {
        query: `*${query}*`,
      },
    },
    (err, result) => {
      if (err) return res.json({ err: err.message })
      const foundUsers = result.hits.hits.map((user) => {
        const username = user._source.username
        const id = user._id
        return { username, id }
      })
      const token = req.token
      const decodedUser = jwt.verify(token, process.env.SECRET)
      if (decodedUser) {
        console.log('!!!!!!!!!!!!!!!!!!!! ', foundUsers)
        const filteredOutSelf = foundUsers.filter(
          (u) => u.id !== decodedUser.id
        )
        console.log('!!!!!!!!!!!!!!!!!!!! ', filteredOutSelf)
        return res.json({ foundUsers: filteredOutSelf })
      }
      return res.json({ foundUsers })
    }
  )
})

module.exports = userRouter
