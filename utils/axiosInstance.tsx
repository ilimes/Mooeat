import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const requestSuccessHandler = async (config: InternalAxiosRequestConfig) => {
  const session = await getSession();
  const token = session?.user?.info?.data?.token;

  if (token) {
    config.headers.token = token;
  }
  return config;
};

const requestErrorHandler = (error: Error | AxiosError) =>
  // console.log('request 실패 : ', error);
  Promise.reject(error);
const responseSuccessHandler = (response: AxiosResponse) =>
  // console.log('response 성공: ', response);
  response;
const responseErrorHandler = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const { method, url } = error.config as InternalAxiosRequestConfig;
    if (error.response) {
      const { statusCode, message } = error.response.data;
      console.log(`🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`);
    }
  } else {
    console.log(`🚨 [API] | Error ${error.message}`);
  }
  return Promise.reject(error);
};

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000,
  timeoutErrorMessage: '요청이 너무 깁니다.',
});

axiosInstance.interceptors.request.use(requestSuccessHandler, requestErrorHandler);
axiosInstance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);

export default axiosInstance;
