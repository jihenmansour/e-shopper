import axios from "axios";
import { apiURL } from "../utils";


export const getOrders = async (
    page: number
  ): Promise<OrdersTableProps> => {
    const response = await axios.get(`${apiURL}/orders?page=${page}`);
    return response.data;
  };
export const deleteOrder = async(id?: string) => {
    try {
        const response = await axios.delete(`${apiURL}/order/${id}`);
        return response.data;
      } catch (error) {
        console.log("error: ", error);
      }
}

export const exportExcel = async () => {
    try {
        const response  = await axios.get(`${apiURL}/orders/export`, {
            responseType: 'blob'
        }); 
        const href = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'orders list.xlsx'); 
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        URL.revokeObjectURL(href); 
    } catch (error) {
        console.log("error: ", error); 
    }
  
}
