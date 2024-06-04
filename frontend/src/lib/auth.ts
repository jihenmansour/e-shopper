import cookie from "js-cookie";
import axios from "axios";

export const setCookie = (key: string, value: any) => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key: string) => {
  cookie.remove(key);
};

export const getCookie = (key: string) => {
  return cookie.get(key);
};

export const setAuthentication = (token: any) => {
  setCookie("token", token);
};

export const logOut = () => {
  removeCookie("token");
};

