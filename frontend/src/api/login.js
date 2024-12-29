import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const LOGIN_URL = API_ROUTES.LOGIN;

export const login = async (formdata) => {
  console.log("login api called");
  const response = await axios.post(LOGIN_URL, {
      email: formdata.email,
      password: formdata.password,
  });
  const data = await response.data;
//   console.log("token", data);
  return data;
};