const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createUserAndToken = async () => {
  const user = new User({
    username: 'username',
    email: 'a@gmail.com',
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
