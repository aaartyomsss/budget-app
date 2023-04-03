import axios from 'axios'
import { User } from '../types/user'
const baseUrl = 'http://localhost:3000/api/login'
const userUrl = 'http://localhost:3000/api/users'
const googleUrl = 'http://localhost:3000/api/google'

const login = async (creds) => {
  const res = await axios.post<User>(baseUrl, creds)
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
