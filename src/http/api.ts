import axios from './axios';
import { IAuthSuccessResponseData } from '../interfaces/auth.interface';


export const login = (email: string, password: string): Promise<IAuthSuccessResponseData> => {
  return axios.request({
    url: '/users/login',
    method: 'post',
    data: {
      email,
      password,
    },
  }).then((response) => response.data);
};

export const register = (firstName: string, lastName: string, email: string, password: string): Promise<IAuthSuccessResponseData> => {
  return axios.request({
    url: '/users/register',
    method: 'post',
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  }).then((response) => response.data);
};
