"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { apiURL, parseStringify } from "../utils";



export const signUp = async (user: FormData) => {
    try {
      const response = await axios.post(`${apiURL}/signup`, user, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      
      return (response.data);
    } catch (error) {
      if(error.response.data.message){
      }
  }
  };

  export const login = async ({ email, password }: LoginProps) => {
    try {
      const response = await axios.post(`${apiURL}/login`, { email, password });
      cookies().set("token", response.data.token, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      const user = await getUserInfo();
      return user
    } catch (error) {
     console.log('error: ', error)
    }
  };


  export const getUserInfo = async () => {
    const token = cookies().get("token")?.value;
  
    if (token) {
      const response = await axios.post(`${apiURL}/auth`, { token });
      return parseStringify(response.data.user);
    
    }
    
  };

export const getUser = async (id: string): Promise<userProps> => {

    const response = await axios.get(`${apiURL}/user/${id}`);
    return response.data.user

}


export const getAllusers = async (page: number): Promise<UsersTableProps> => {
    const response = await axios.get(`${apiURL}/users?page=${page}`);
    return parseStringify(response.data)
  };

  export const updateUser = async ({id, user}: {id?: string, user:userProps}) => {
    try {
      const response = await axios.put(`${apiURL}/user/${id}`, user);
      return parseStringify(response.data)
    } catch (error) {
      console.log('error: ', error)
    }

  };

export const deleteUser = async (id?: string) => {
try{
      const user = await getUserInfo()
      const response = await axios.delete(`${apiURL}/user/${id}`);
      return parseStringify(response.data)
}catch(error){
  console.log('error: ', error)
}
}

