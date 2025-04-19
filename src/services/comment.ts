import { IBodyComment } from './types';
import axios from 'axios';

export const listComments = () => {
  return axios.get('https://jsonplaceholder.typicode.com/comments');
};

export const updateComment = (id: string, data: any) => {
  return axios.put(`https://jsonplaceholder.typicode.com/comments/${id}`, data);
};

export const deleteComment = (id: number) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
};

export const createComment = (data: IBodyComment) => {
  return axios.post(`https://jsonplaceholder.typicode.com/comments`, data);
};
