import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const API_BASE_URL = process.env.API_URL || 'https://blog-mysql-seven.vercel.app';

// GET request
export const get = async <T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${API_BASE_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error; 
  }
};

// POST request
export const post = async <T>(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<T> => {
  console.log('endpooint', endpoint);
  console.log('data',data);
  console.log('config', config);
  
  
  try {
    const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

//DELETE request
export const del = async <T>(endpoint: string, config: AxiosRequestConfig = {}): Promise<T> => {
  console.log('delte is worikng');
  
  try {
    const response: AxiosResponse<T> = await axios.delete(`${API_BASE_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};
