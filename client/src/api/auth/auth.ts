import { PrivateAPI, PublicAPI } from "../BaseAPI";
import type { RegisterFormData } from "@/Schema/Register";
import type { LoginFormData } from "@/Schema/Login";



export const registerUser = async(userData :RegisterFormData) => {

    const response = await PublicAPI.post(`/api/auth/local/register`, userData);
    
    return response.data;
}

export const loginUser = async(userData :LoginFormData) => {

    const response = await PublicAPI.post(`/api/auth/local`, userData);
    return response.data;
}

export const getMe = async () => {
  const response = await PrivateAPI.get("/api/users/me?populate=role");
  return response.data;
};