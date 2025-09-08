import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

const errorHandler = async (error: AxiosError): Promise<never> => {
  const responseMeta = error.response?.data as TErrorResponse;
  return Promise.reject(responseMeta);
};

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

request.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: AxiosError) => errorHandler(error)
);

export default request;
