import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TASK_LIST_URL = API_ROUTES.TASKLIST

export const taskList = async (formdata) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(TASK_LIST_URL, {
        priority: formdata.priority,
        status: formdata.status
    },{
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
  });
  const data = await response.data;
  console.log("Task List api called");
  // console.log(data);
  return data;
};