import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants";

// Create an Axios instance with a custom base URL
const api=axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Add a request interceptor to automatically attach the access token to every request
api.interceptors.request.use((config)=>{
    const token=Cookies.get(ACCESS_TOKEN);
    if(token){
        config.headers.Authorization =`Bearer ${token}`; 
    }
    return config;
    },
    (error)=>{
    console.error("Request failed due to network issues or misconfiguration", error);
    return Promise.reject(error);
    }
);


export default api;