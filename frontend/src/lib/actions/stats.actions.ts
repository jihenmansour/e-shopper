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

export const exportExcel = async (search?: string) => {
  try {
    const response = await axios.get(`${apiURL}/orders/export`, {
      params: { search },
      responseType: "blob",
    });
    
    const href = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "orders list.xlsx");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  } catch (error) {
    console.log("error: ", error);
  }
};