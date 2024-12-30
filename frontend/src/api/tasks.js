import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TASK_CREATE_URL = API_ROUTES.CREATETASK
const TASK_DELETE_URL = API_ROUTES.DELETETASK
const TASK_EDIT_URL = API_ROUTES.EDITTASK

export const createtask = async (formdata) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(TASK_CREATE_URL, {
        "name": formdata.name,
        "priority": formdata.priority,
        "startTime": formdata.startTime,
        "endTime": formdata.endTime,
        "status": formdata.status,
    },{
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        }
  });
  const data = await response.data;
  console.log("Task Create api called");
  // console.log(data);
  return data;
};

export const deletetask = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    const response = await axios.post(TASK_DELETE_URL, {
          "taskIds": formdata.taskIds,
      },{
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          }
    });
    const data = await response.data;
    console.log("Task Delete api called");
    // console.log(data);
    return data;
};

export const editTask = async (formdata) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    const response = await axios.post(TASK_EDIT_URL, {
        "name": formdata.name,
        "priority": formdata.priority,
        "startTime": formdata.startTime,
        "endTime": formdata.endTime,
        "status": formdata.status,
        "taskId": formdata.taskId
    },{
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          }
    });
    const data = await response.data;
    console.log("Task Edit api called");
    // console.log(data);
    return data;
};