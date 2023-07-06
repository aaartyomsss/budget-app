require('dotenv/config')

const PORT = process.env.PORT || 3000
const DB_CONNECTION =
  process.env.NODE_ENV === 'test'
    ? process.env.DB_TEST_CONNECTION
    : process.env.DB_CONNECTION
const SESSION_SECRET = process.env.SESSION_SECRET
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const SECRET = process.env.SECRET
const SALT_ROUNDS = process.env.SALT_ROUNDS
const EMAIL_TOKEN = process.env.EMAIL_TOKEN
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD
const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DB = process.env.MONGO_DB
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL
const REDIS_HOST = process.env.REDIS_HOST

const REMOTE_BASE_URL = process.env.REMOTE_BASE_URL

const MONGO_HOST = process.env.MONGO_HOST
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DB}`
const MONGO_TEST_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/api_test_db`

const MONGODB_URI = process.env.NODE_ENV === 'test' ? MONGO_TEST_URL : MONGO_URL

module.exports = {
  PORT,
  DB_CONNECTION,
  SESSION_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SECRET,
  SALT_ROUNDS,
  EMAIL_TOKEN,
  GMAIL_USER,
  GMAIL_PASSWORD,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_DB,
  FRONTEND_BASE_URL,
  REDIS_HOST,
  MONGODB_URI,
  REMOTE_BASE_URL,
}
