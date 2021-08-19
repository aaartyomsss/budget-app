import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/family-plan-request';

const getAllSentRequests = async (userId) => {
  const { data } = await axios.get(`${baseUrl}/sent-requests/${userId}`);
  return data;
};

const sendRequest = async (params) => {
  const { data } = await axios.post(`${baseUrl}/send-request`, params);
  return data;
};

export default { getAllSentRequests, sendRequest };
