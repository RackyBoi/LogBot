import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

async function axiosRequest(params: AxiosRequestConfig): Promise<AxiosResponse> {
  console.log(`Request to ${params.url}`);

  return axios.request(params);
}

export default axiosRequest;
