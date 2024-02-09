import axios from "axios";

export const appAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    //"Token": "myToken",
    "Content-Type": "application/json",
  },
});
