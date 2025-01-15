import axios from 'axios';
import NProgress from 'nprogress';
import qs from 'qs';

const { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_VERSION } = process.env;

axios.defaults.baseURL = `${NEXT_PUBLIC_API_URL}/${NEXT_PUBLIC_API_VERSION}`;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.paramsSerializer = (params) => qs.stringify(params);

// Request interceptor
axios.interceptors.request.use((config) => {
  if (config.headers?.progress !== false) {
    NProgress.start();
  }
  return config;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default axios;
