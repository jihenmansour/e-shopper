import axios from "axios";

const apiURL = process.env.NEXT_PUBLIC_APP_API_URL;


export const addProduct = async (product: productProps ) => {
    try {
      const response = await axios.post(`${apiURL}/product`, product, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return (response);
    } catch (error) {
      console.error('Error', error);
    }
  };

export const getAllproducts = async (): Promise<productProps[]> => {
    const response = await axios.get(`${apiURL}/products`);
    return response.data
  };


 export const deleteProduct = async (id?: string) => {
    try {
      const response = await axios.delete(`${apiURL}/product/${id}`);
      return (response);
    } catch (error) {
      console.error('Error', error);
    }
  }
