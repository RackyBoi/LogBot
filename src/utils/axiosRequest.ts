import axios, { AxiosRequestConfig } from 'axios';


async function axiosRequest(params: AxiosRequestConfig) {
  console.log(`Request to ${params.url}`);

  return axios.request(params);
}

export default axiosRequest