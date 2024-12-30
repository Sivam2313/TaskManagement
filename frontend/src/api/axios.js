import axios from "axios";

const api = process.env.REACT_APP_API || "https://taskmanagement-hehd.onrender.com";

export default axios.create({
  baseURL: api,
});
