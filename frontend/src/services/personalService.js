import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/personal-plan'

let token = null

const setToken = (t) => {
  token = t
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addExpense = async (toAdd) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const res = await axios.post(baseUrl, toAdd, config)
  return res.data
}

const removeExpense = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const modifyExpense = async (id, newExpense) => {
  const res = await axios.patch(`${baseUrl}/${id}`, newExpense)

  return res.data
}

export default { getAll, addExpense, setToken, removeExpense, modifyExpense }; // eslint-disable-line
