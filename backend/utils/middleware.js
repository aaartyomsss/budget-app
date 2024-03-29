const logger = require('./loggers')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    request.token = token
    next()
  } else {
    next()
  }
}

const isAuthenticated = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedUser = jwt.verify(token, process.env.SECRET)
    if (!decodedUser)
      return response.status(403).send({ error: 'Unauthenticated' })
    request.user = decodedUser
    next()
  } else {
    return response.status(403).send({ error: 'Unauthenticated' })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  isAuthenticated,
}
