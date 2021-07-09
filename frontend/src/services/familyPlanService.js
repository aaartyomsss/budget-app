import axios from "axios";
const baseUrl = "http://localhost:3001/api/family-plan";

const initialize = async (planName, userId) => {
  const res = await axios.post(`${baseUrl}/initialize-plan`, {
    planName,
    userId,
  });
  console.log(res);
};

export default { initialize }; //eslint-disable-line
