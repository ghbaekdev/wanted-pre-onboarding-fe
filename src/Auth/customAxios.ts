import axios, { AxiosInstance } from 'axios';
import { PROPERTIES } from '../config/properties';

const headers = {
  Authorization: localStorage.getItem('access_token') || '',
};

export const customAxios: AxiosInstance = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  headers: headers,
});
