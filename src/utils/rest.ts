import axios, { AxiosRequestConfig } from 'axios';

async function dataRequest<Type>(
  path: string,
  options?: AxiosRequestConfig
): Promise<Type> {
  const { method = 'GET', data = null, headers = {} } = options || {};

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const requestParams = {
    url: `https://crm-proj-2103c-default-rtdb.firebaseio.com${path}.json`,
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    data,
  };

  if (method === 'get') {
    delete requestParams.data;
  }

  try {
    const response = await axios(requestParams);

    return response.data;
  } catch (err) {
    console.error('>>> API Error ', err);
    throw err;
  }
}

export default dataRequest;
