import axios from "axios";
import { API } from "../BaseAPI";


export async function getCategories(){
    const response = await axios.get(`${API}/api/categories`);
    return response.data.data ;
}