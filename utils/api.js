import asyncStorage from "@react-native-async-storage/async-storage";
// Base URL for your API - change this to your server URL
// IMPORTANT: For React Native on physical devices, use your computer's IP address instead of localhost
// Example: 'http://192.168.1.100:3000/api' (replace with your actual IP)
// For iOS Simulator/Android Emulator, you can use 'http://localhost:3000/api'
// To find your IP: On Mac/Linux run 'ifconfig', on Windows run 'ipconfig'
const API_BASE_URL = "http://localhost:3000/";

// API Calls for Login Signup and getCurrentUser

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  requiresAuth = false
) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    // check for jwt token

    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      config.body = JSON.stringify(body);
    }
    const config = {
      method,
      headers,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// login and Sign up
export const authApi = {
  // signup
  signup: async (name, email, password) => {
    
  },
};
