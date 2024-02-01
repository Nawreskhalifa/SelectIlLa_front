import { API_BASE_URL } from './constants';
export const endPoints = {
    login: `${API_BASE_URL}auth/local`,
    allUsers: `${API_BASE_URL}users?populate=*`,
    allCustomers: `${API_BASE_URL}customers?populate=*`,
    deleteCustomer: `${API_BASE_URL}customers/`,
    findCustomer: `${API_BASE_URL}customers/`,
    allPartners: `${API_BASE_URL}partners?populate=*`,
    register: `${API_BASE_URL}auth/local/register`,
    logout: `${API_BASE_URL}auth/logout`,
    forgetPassword: `${API_BASE_URL}forgetPassword`,
    resetPassword: `${API_BASE_URL}password/reset`,
    refreshToken: `${API_BASE_URL}token/refresh`,

};