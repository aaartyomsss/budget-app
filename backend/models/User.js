const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')
const ESClient = require('../elasticSearch/index')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    unique: true,
    es_indexed: true,
  },
  googleId: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    unique: true,
  },
  personalPlan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  confirmed: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: false,
  },
  familyPlans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyPlan',
    },
  ],
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(mongoosastic, {
  esClient: ESClient,
})

userSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
