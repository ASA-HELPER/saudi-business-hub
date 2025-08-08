import axios from "axios";

// Base URL - consider using .env file for environments
const BASE_URL = "https://eservices.deenzprojects.com/backoffice/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // adjust key if different
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Log the outgoing request
    console.log("🔸 Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
      token,
    });

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // ✅ Log the incoming response
    console.log("✅ Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error) => {
    // ❌ Log response errors
    console.error("❌ Response Error:", {
      url: error?.config?.url,
      status: error?.response?.status,
      message: error?.message,
      data: error?.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosClient;
