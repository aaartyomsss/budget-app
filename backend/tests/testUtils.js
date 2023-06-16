const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createUserAndToken = async () => {
  const randInt = Math.floor(Math.random() * 1000000) + 1

  const user = new User({
    username: `username${randInt}`,
    email: `a${randInt}@gmail.com`,
    name: 'Name',
    passwordHash: 'Hashssss',
    confirmed: true,
  })

  await user.save()

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  return { token, user }
}

module.exports = {
  createUserAndToken,
}
