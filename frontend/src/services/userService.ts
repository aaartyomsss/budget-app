import axios from 'axios'
import { User } from '../types/user'

const login = async (creds) => {
  const res = await axios.post<User>('login/', creds)
  return res.data
}

const register = async (creds) => {
  const res = await axios.post('users/', creds)
  return res.data
}

const postGoogle = async (req) => {
  const res = await axios.post('google/', req)
  return res.data
}

const changePassword = async (passwords) => {
  const res = await axios.patch(`users/reset-password/`, passwords)
  return res
}

export default { login, register, postGoogle, changePassword }
