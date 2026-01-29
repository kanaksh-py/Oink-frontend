import axios from "axios";

// FORCE the Render URL. 
// Make sure there is NO trailing slash after 'v1'
const BASE_URL = "https://oink-backend.onrender.com/api/v1";

export const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
});