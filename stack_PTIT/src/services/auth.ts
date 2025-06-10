const BASE_URL = "http://localhost:8000";
import request from "umi-request";
import { User } from "./Users/typing";

interface AuthResponse {
  success?: boolean;
  data?: {
    token: string;
    user: User;
  };
  message?: string;
  access_token?: string;
  token_type?: string;
}

export function login(data: { email: string; password: string }): Promise<AuthResponse> {
  const formData = new URLSearchParams();
  formData.append("username", data.email);
  formData.append("password", data.password);

  return request(`${BASE_URL}/auth/login`, {  
    method: "POST",
    data: formData,
    requestType: "form", // umi-request sẽ set Content-Type: application/x-www-form-urlencoded
    errorHandler: (error) => {
      console.error('Login API error:', error);
      return Promise.reject(error);
    }
  });
}

export function register(data: {
  email: string;
  password: string;
  username: string;
}): Promise<AuthResponse> {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    data,
    errorHandler: (error) => {
      console.error('Register API error:', error);
      return Promise.reject(error);
    }
  });
}
