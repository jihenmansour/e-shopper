"use server"

import axios from "axios";
import { apiURL, parseStringifyError } from "../utils";
import { orderProps, OrdersTableProps } from "../../../types";
import { revalidatePath } from "next/cache";

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
    revalidatePath('/orders')

    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};

export const deleteOrder = async (id?: string) => {
  try {
    const response = await axios.delete(`${apiURL}/order/${id}`);
    revalidatePath('/orders')
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};


