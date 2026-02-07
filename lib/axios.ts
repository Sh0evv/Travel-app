import axios from "axios";

const api = axios.create({
  baseURL: "https://student2.softclub.tj",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
