import axios from "axios";

export const URL = "http://85.192.48.165:5001/api";

export const api = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
});

const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string).token
    : "";

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
