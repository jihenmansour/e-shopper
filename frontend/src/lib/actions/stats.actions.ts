import axios from "axios";
import { apiURL } from "../utils";


export const getStats = async() => {
  const response = await axios.get(`${apiURL}/stats`);
  return response.data;
}

export const getCategoriesStats = async()=>{
  const response = await axios.get(`${apiURL}/categories/stats`);
  return response.data;
}