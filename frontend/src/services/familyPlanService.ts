import axios from 'axios'

const createPlan = async (planName, userId) => {
  const res = await axios.post(`family-plan/initialize-plan`, {
    planName,
    userId,
  })
  return res
}

const searchUser = async (query) => {
  const res = await axios.get(`users/search/${query}`)
  return res
}

export default { createPlan, searchUser }
