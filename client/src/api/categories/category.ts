import {PublicAPI } from "../BaseAPI";


export async function getCategories(){
    const response = await PublicAPI.get(`/api/categories`);
    return response.data.data ;
}