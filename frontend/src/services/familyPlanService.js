import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/family-plan';
const searchUrl = 'http://localhost:3001/api/users/search';

const createPlan = async (planName, userId) => {
  const res = await axios.post(`${baseUrl}/initialize-plan`, {
    planName,
    userId,
  });
  return res;
};

const searchUser = async (query) => {
  const res = await axios.get(`${searchUrl}/${query}`);
  return res;
};

export default { createPlan, searchUser }; //eslint-disable-line
