import axios, { AxiosRequestConfig } from "axios";
import { baseUrl } from "../services/auth-service";

// Set the base URL and default headers just once
axios.defaults.baseURL = baseUrl; // Ensure `baseUrl` is correctly imported and set
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const request = async (requestConfig: AxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication token is missing, user must be logged in");
  }

  requestConfig.headers = {
    ...requestConfig.headers,
    Authorization: `Bearer ${token}`
  };

  try {
    return await axios(requestConfig);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response) {
        const status = e.response.status;
        const message = e.response.data?.message || e.message;
        throw { status, message, name: e.name, original: e };
      } else {
        throw { status: 500, message: "No response received", original: e };
      }
    } else if (e instanceof Error) {
      throw { message: e.message, status: 500 };
    } else {
      throw { message: "An unknown error occurred", status: 500 };
    }
  }
};
