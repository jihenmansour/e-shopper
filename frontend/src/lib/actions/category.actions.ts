"use server";

import axios from "axios";
import { apiURL, parseStringifyError } from "../utils";
import { categoryProps, CatgoriesTableProps } from "../../../types";
import { revalidatePath } from "next/cache";

export const createCategory = async (category: FormData) => {
  try {
    const response = await axios.post(`${apiURL}/category`, category, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidatePath("/categories")
    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};


export const getAllcategories = async() =>{
  const response = await axios.get(`${apiURL}/categories/all`)
  return response.data;
}
export const getCategory = async (id: string): Promise<categoryProps> => {

  const response = await axios.get(`${apiURL}/category/${id}`);
  return response.data.category;
};

export const getCategories = async (
  page: number,
  search?: string
): Promise<CatgoriesTableProps> => {
  const response = await axios.get(`${apiURL}/categories`,{
    params: {
      page,
      search
    }
  });
  return response.data;
};

export const updateCategory = async ({
  id,
  category,
}: {
  id?: string;
  category: FormData;
}) => {
  try {
    const response = await axios.put(`${apiURL}/category/${id}`, category);
    revalidatePath('/categories')
    return response.data;
  } catch (error) {
    return parseStringifyError(error.response.data.message);
  }
};

export const deleteCategory = async (id?: string) => {
  try {
    const response = await axios.delete(`${apiURL}/category/${id}`);
    revalidatePath('/categories')
    return response.data;
  } catch (error) {
    console.log("error: ", error);
  }
};
