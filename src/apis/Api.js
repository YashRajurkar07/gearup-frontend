import axios from "axios";

const Api = axios.create({
    baseURL : "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem("jwtToken");

        // console.log("Interceptor Check - URL:", config.url, "Token:", token ? "Exists" : "Missing");
        
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Api;