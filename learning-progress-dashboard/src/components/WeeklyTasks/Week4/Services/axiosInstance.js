import axios from "axios";



const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1", 
  timeout: 5000, 
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirecting to login...");
        const handleUnauthorized = (navigate) => {
          console.error('Unauthorized! Redirecting to login...');
          navigate('/login');
        };
        
      }
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
