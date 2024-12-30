import axios, { axiosPrivate } from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const DETAILS_URL = API_ROUTES.TASKDETAILS;
const TABLE_URL = API_ROUTES.TABLE;

export const getDetails = async () => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.get(DETAILS_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log("Task Details api called");
  // console.log(data);
  return data;
};

export const getTable = async () => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.get(TABLE_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log("Table api called");
  return data;
}
