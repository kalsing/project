import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})


api.interceptors.request.use((config) => {
    const userData = localStorage.getItem("3chanUser");
    if(userData){
        const {token} = JSON.parse(userData);
        if(token) {
            config.headers ["Authorization"] = `Bearer ${token}`;

        }
    }
    return config;
});

export default api;