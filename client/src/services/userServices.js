import axios from "axios";

const baseURL = "https://nodeservices.netlify.app/api";

const validateAndSignUpUser = async (payload) => {
  try {
    const data = await axios.post(`${baseURL}/signup`, payload);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const validateAndLogin = async (payload) => {
  try {
    const data = await axios.post(`${baseURL}/login`, payload);
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const userServices = {
  validateAndSignUpUser,
  validateAndLogin,
};

export default userServices;
