import axios from "axios"
import {HOST_API} from "../config-global";

const api = axios.create({
  baseURL: HOST_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
