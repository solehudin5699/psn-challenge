import axios from 'axios';
import { IBodyLogin } from './types';

export const login = (data: IBodyLogin) => {
  return axios.post(`/api/login`, data, {});
};

export const logout = () => {
  return axios.post(`/api/logout`);
};
