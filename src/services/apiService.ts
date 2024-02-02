import axios, { AxiosRequestConfig } from 'axios';
import { endPoints } from '../utils/endPoints';
import { keys } from '../utils/storageKeys';
import { UserApi } from '@/models/User/UserApi';
import { httpCodes } from '@/utils/httpCodes';
import { methodsHttpNames } from '@/utils/methods';
import { API_BASE_URL } from '@/utils/constants';
 import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
});


api.interceptors.request.use(
    async config => {
        const token = await localStorage.getItem(keys.token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        throw error;
    },
);
export async function makeApiRequest(
    method: string,
    endpoint: string,
    dataObject?: object,
    paramsObject?: object,
    headers?: AxiosRequestConfig['headers'],
    useToken = true,
) {
    try {
        const token = useToken ? await localStorage.getItem(keys.token) : null;
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        }

        const response = await api.request({
            method,
            url: endpoint,
            data: dataObject,
            params: paramsObject,
            headers: headers,
        });
        return {
            success: response.status,
            data: response.data,
        };
    } catch (error: any) {
        if (
            error?.response &&
            error?.response?.status === httpCodes.HTTP_UNAUTHORIZED
        ) {
            const token = await refreshToken();
            if (token) {
                const { data } = await api.request({
                    method,
                    url: endpoint,
                    data: dataObject,
                    params: paramsObject,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                return { success: true, data: data };
            }
        }

        return {
            success: false,
            error: error,
        };
    }
}


api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === httpCodes.HTTP_UNAUTHORIZED &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const token = await refreshToken();
            if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return api(originalRequest);
            } else {
                throw error; // Re-throw the original error if refreshToken fails
            }
        }

        throw error;
    },
);



export async function logIn(identifier: string, password: string) {
    try {
        // Send a POST request to the login endpoint with user credentials
        const response = await axios.post(endPoints.login, {
            identifier: identifier,
            password: password
        });

        // Extract JWT token and user data from the response
        const { jwt, user } = response.data;

        // Store JWT token and user data in local storage for future use
        window.localStorage.setItem(keys.token, jwt);
        window.localStorage.setItem(keys.userData, JSON.stringify(user));

        // Return success along with response data and status
        return { message: "", data: response.data, status: response.status };
    } catch (error: any) {
        // Handle errors in case of login failure
        return {
            status: error?.response?.data.error.status,
            message: error?.response.data.error.message,
            data: null
        };
    }
}
export async function refreshToken() {
    const token = await localStorage.getItem(keys.token);
    if (!token) {
        return null;
    }
    try {
        const data = {
            refreshToken: token,
        };
        const options = {
            "Access-Control-Allow-Credentials": true,
            withCredentials: true,
        };
        const response = await axios.post(
            endPoints.refreshToken,
            data,
            options
        );
        console.log(response)
        if (response.status == httpCodes.HTTP_OK) {
            console.log(response)
            await localStorage.setItem(keys.token, response.data.jwt);
            return response.data.jwt;
        }
        return response

    } catch (error) {

        return null;
    }
}
export async function register(userApi: UserApi) {
    try {
        // Send a POST request to the register endpoint with user data
        const response = await axios.post(endPoints.register, userApi, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: response.status === httpCodes.HTTP_OK, data: response.data, status: response.status };
    } catch (error: any) {
        return {
            status: error?.response?.status,
            success: error?.response?.data?.success,
            error: error?.response?.data?.message,
        };
    }
}

export async function fetchVehicles() {
    try {
        console.log("ok")
      const response = await axios.get(endPoints.vehicle);
      if (response) {
        return response.data;
      } else {
        console.error("Failed to fetch vehicles:");
        throw new Error("Failed to fetch vehicles");
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
    }
  }