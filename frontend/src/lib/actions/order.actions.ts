import axios from "axios";
import { apiURL, parseStringifyError } from "../utils";
import { orderProps, OrdersTableProps } from "../../../types";

export const getOrders = async (
  page: number,
  search?: string
): Promise<OrdersTableProps> => {
  const response = await axios.get(`${apiURL}/orders`, {
    params: {
      page,
      search,
    },
  });
  return response.data;
};

export const getOrder = async (id: string): Promise<orderProps> => {
  const response = await axios.get(`${apiURL}/order/${id}`);
  return response.data.order;
};

export const updateOrder = async (order: FormData) => {
  try {
    const response = await axios.put(`${apiURL}/order`, order, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};

export const deleteOrder = async (id?: string) => {
  try {
    const response = await axios.delete(`${apiURL}/order/${id}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};

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
