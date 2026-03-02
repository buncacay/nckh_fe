import React from 'react';
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5056/api/",
    timeout: 5000,
    headers:{
        "Content-type":"application/json"

    }
});
api.interceptors.request.use(config => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log("🚀 Calling API:", fullUrl, "with params:", config.params);
    return config;
});


api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("token");
        if (token){
            config.headers.Authorization= `Bearer ${token}`
        }
        return config;
    }
)

export default api;