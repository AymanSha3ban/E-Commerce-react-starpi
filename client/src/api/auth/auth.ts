import axios from "axios";
import { API } from "../BaseAPI";
import type { RegisterFormData } from "@/Schema/Register";
import type { LoginFormData } from "@/Schema/Login";



export const registerUser = async(userData :RegisterFormData) => {

    const response = await axios.post(`${API}/api/auth/local/register`, userData);
    
    return response.data;
}

export const loginUser = async(userData :LoginFormData) => {

    const response = await axios.post(`${API}/api/auth/local`, userData);
    return response.data;
}