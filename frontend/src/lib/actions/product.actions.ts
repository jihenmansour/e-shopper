"use server";

import axios from "axios";
import { apiURL, parseStringifyError } from "../utils";
import { productProps, ProductsTableProps } from "../../../types";

export const createProduct = async (product: FormData) => {
  try {

    const response = await axios.post(`${apiURL}/product`, product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};

export const getProduct = async (id: string): Promise<productProps> => {

  const response = await axios.get(`${apiURL}/product/${id}`);
  return response.data.product;
};

export const getAllproducts = async () => {
  const response = await axios.get(`${apiURL}/products/all`);
  return response.data
}


export const getProducts = async (
  page: number,
  limit?: number ,
  sort?: string,
  search?: string
): Promise<ProductsTableProps> => {
  const response = await axios.get(`${apiURL}/products`,{
    params: {
      page,
      limit,
      sort,
      search
    }
  });
  return response.data;
};

export const updateProduct = async ({
  id,
  product,
}: {
  id?: string;
  product: FormData;
}) => {
  try {
    const response = await axios.put(`${apiURL}/product/${id}`, product);
    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};

export const deleteProduct = async (id?: string) => {
  try {
    const response = await axios.delete(`${apiURL}/product/${id}`);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
