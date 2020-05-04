import axios from './axios';
import { IAuthLoginResponseData } from '../interfaces/auth.interface';


export const login = (email: string, password: string): Promise<IAuthLoginResponseData> => {
  return axios.request({
    url: '/users/login',
    method: 'post',
    data: {
      email,
      password,
    },
  }).then((response) => response.data);
};
