import axios from "axios"

export const backendURL = "http://localhost:8000"

export const API = axios.create({
  baseURL: backendURL
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})