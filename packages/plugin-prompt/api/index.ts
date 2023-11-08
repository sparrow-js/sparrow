
import axios from 'axios';


const request = axios.create({
  baseURL: 'http://localhost:3000/api',
});


request.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export async function editInsertNode(options?: { [key: string]: any }) {
  return request('/edit/insertNode', {
    method: 'GET',
    params: options,
  });
}

// chainExecute
export async function chainExecute(options?: { [key: string]: any }) {
  return request('/chatgpt/chainExecute', {
    method: 'POST',
    data: options,
  });
}

export async function saveflowInfo(options?: { [key: string]: any }) {
  return request('/chatgpt/saveflowInfo', {
    method: 'POST',
    data: options,
  });
}
