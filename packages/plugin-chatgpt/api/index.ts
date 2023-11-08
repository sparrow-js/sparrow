
import axios from 'axios';


const request = axios.create({
  baseURL: 'http://localhost:3000/api',
});


request.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

/* GET /chatgpt/connect */
export async function chatgptConnect(options?: { [key: string]: any }) {
    return request('/chatgpt/connect', {
      method: 'GET',
      params: options,
    });
}

export async function chatgptGetAppKey() {
  return request('/chatgpt/getAppKey', {
    method: 'GET',
  });
}

export async function chatgptGenerate(options?: { [key: string]: any }) {
  return request('/chatgpt/generate', {
    method: 'POST',
    data: options,
  });
}

export async function editInsertNode(options?: { [key: string]: any }) {
  return request('/edit/insertNode', {
    method: 'GET',
    params: options,
  });
}

export async function getPromptList(options?: { [key: string]: any }) {
  return request('/chatgpt/getPromptList', {
    method: 'GET',
    params: options,
  });
}

export async function watchProject(options?: { [key: string]: any }) {
  return request('/edit/watchProject', {
    method: 'GET',
    params: options,
  });
}

export async function getProjectRootPath(options?: { [key: string]: any }) {
  return request('/edit/getProjectRootPath', {
    method: 'GET',
    params: options,
  });
}

export async function getWatchChangeFiles(options?: { [key: string]: any }) {
  return request('/edit/getWatchChangeFiles', {
    method: 'GET',
    params: options,
  });
}

export async function getCodePromptList(options?: { [key: string]: any }) {
  return request('/chatgpt/getCodePromptList', {
    method: 'GET',
    params: options,
  });
}

export async function getFilesContent(options?: { [key: string]: any }) {
  return request('/edit/getFilesContent', {
    method: 'GET',
    params: options,
  });
}

export async function chatgptGenerateLink(options?: { [key: string]: any }) {
  return request('/chatgpt/generateLink', {
    method: 'POST',
    data: options,
  });
}

export async function startCodeDocument(options?: { [key: string]: any }) {
  return request('/chatgpt/startCodeDocument', {
    method: 'GET',
    params: options,
  });
}

export async function executeProduceChain(options?: { [key: string]: any }) {
  return request('/chatgpt/executeProduceChain', {
    method: 'GET',
    params: options,
  });
}
