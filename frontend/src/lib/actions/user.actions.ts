"use server"

import axios from "axios";
import { cookies } from "next/headers";

const apiURL = process.env.NEXT_PUBLIC_APP_API_URL;



export const signUp = async (user: userProps) => {
    try {
      const response = await axios.post(`${apiURL}/signup`, user);
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
      return response.data.user;
    
    }
    return false;
  };


export const getAllusers = async (page: number): Promise<UsersTableProps> => {
    const response = await axios.get(`${apiURL}/users?page=${page}`);
    return response.data
  };


export const deleteUser = async (id?: string) => {
    try {
      const response = await axios.delete(`${apiURL}/user/${id}`);
      return (response);
    } catch (error) {
      console.error('Error', error);
    }
  }