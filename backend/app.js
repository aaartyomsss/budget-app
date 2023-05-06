const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/loggers')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const session = require('express-session')
const googleAuth = require('./routes/googleAuth')
const personalPlan = require('./routes/personalPlan')
const familyPlanRequestRouter = require('./routes/familyPlanRequest')
const familyPlanRouter = require('./routes/familyPlan')

if (config.MONGODB_URI) {
  logger.info('Connection to ', config.MONGODB_URI)
  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info('Connected to database: ', config.MONGODB_URI)
    })
    .catch((e) => {
      logger.error('Database init error: ', e.message)
    })
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Routes
app.use('/users', userRouter)
app.use('/login', loginRouter)
app.use('/google', googleAuth)
app.use('/personal-plan', personalPlan)
app.use('/family-plan-request', familyPlanRequestRouter)
app.use('/family-plan', familyPlanRouter)

//Error handling middleware
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
