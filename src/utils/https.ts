import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3333/api",
});

export const getList = () => http.get("/list").then(res => res.data);
