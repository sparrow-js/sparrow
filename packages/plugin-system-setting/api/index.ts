
import axios from 'axios';


const request = axios.create({
  baseURL: 'http://localhost:3000/api',
});


request.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export async function saveSystemInfo(options?: { [key: string]: any }) {
  return request('/chatgpt/saveSystemInfo', {
    method: 'POST',
    data: options,
  });
}

export async function getSystemInfo(options?: { [key: string]: any }) {
  return request('/chatgpt/getSystemInfo', {
    method: 'GET',
    params: options,
  });
}