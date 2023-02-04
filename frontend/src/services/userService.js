import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'
const userUrl = 'http://localhost:3001/api/users'
const googleUrl = 'http://localhost:3001/api/google'

const login = async (creds) => {
  const res = await axios.post(baseUrl, creds)
  return res.data
}

const register = async (creds) => {
  const res = await axios.post(userUrl, creds)
  return res.data
}

const postGoogle = async (req) => {
  const res = await axios.post(googleUrl, req)
  return res.data
}

const changePassword = async (passwords) => {
  const res = await axios.patch(`${userUrl}/reset-password`, passwords)
  return res
}

export default { login, register, postGoogle, changePassword }
