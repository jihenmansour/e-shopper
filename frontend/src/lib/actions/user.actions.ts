"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { userInfo } from "os";
import { parseStringify } from "../utils";

const apiURL = process.env.NEXT_PUBLIC_APP_API_URL;



export const signUp = async (user: userProps) => {
    try {
      const response = await axios.post(`${apiURL}/signup`, user, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      
      return (response);
    } catch (error) {
      console.error('Error', error);
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


export const getAllusers = async (page: number): Promise<UsersTableProps> => {
    const response = await axios.get(`${apiURL}/users?page=${page}`);
    return parseStringify(response.data)
  };


export const deleteUser = async (id?: string) => {
    try {
      const user = await getUserInfo()
      const response = await axios.delete(`${apiURL}/user`, {
        data:{id, loggedId: user.user._id}
      });

    } catch (error) {
      return (error);
    }
  }