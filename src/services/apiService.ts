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
export async function UpdateCustomer(customer, id) {
  try {
    const response = await axios.put(`${endPoints.findCustomer}${id} `,
      customer, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
export async function postCustomer(customer) {
  try {
    const response = await api.post(endPoints.allCustomers, customer, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
export async function RegistreUser(user) {
  try {
    const response = await axios.post(
      `${endPoints.registreUser} `,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to  registre new user data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to  registre new user data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    return {
      success: false,
      error,
    };
  }
}
export async function UpdateUser(user, id) {
  try {
    console.log(user)
    const response = await axios.put(
      `${endPoints.findUser}/${id} `,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }

    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to  update new user data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to  update  user data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    return {
      success: false,
      error,
    };
  }
}
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
        throw error;
      }
    }

    throw error;
  },
);



export async function logIn(identifier: string, password: string) {
  try {
    const response = await axios.post(endPoints.login, {
      identifier: identifier,
      password: password
    });

    const { jwt, user } = response.data;
    window.localStorage.setItem(keys.token, jwt);
    window.localStorage.setItem(keys.userData, JSON.stringify(user));
    return { message: "", data: response.data, status: response.status };
  } catch (error: any) {
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
// &pagination[start]=${start}&pagination[limit]=${limit}
    const response = await axios.get(`${endPoints.vehicles}/?populate=*`);
    if (response) {
      console.log(response.data)
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

export async function deleteVehicle(vehicleId) {
  try {
    const response = await axios.delete(`${endPoints.vehicles}/${vehicleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with ID ${vehicleId}:`, error);
    throw error;
  }
}

export async function fetchVehicleById(vehicleId, query = "?populate=deep") {
  try {
    const response = await axios.get(`${endPoints.vehicles}/${vehicleId}/${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error  fetch vehicle with ID ${vehicleId}:`, error);
    throw error;
  }
}
export async function fetchVillaById(id, query = "?populate=deep") {
  try {
    const response = await axios.get(`${endPoints.villa}/${id}/${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error  fetch vehicle with ID ${id}:`, error);
    throw error;
  }
}
export async function fetchVehicleCategories(query = "") {
  try {
    const response = await axios.get(`${endPoints.vehiclesCategories}?${query}`);
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch vehicles");
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
}


export async function postVehicle(files, data) {
  try {
    console.log(Array.isArray(files), data, files.value);
    const formData = new FormData();

    files.value.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append('ref', 'api::vehicle.vehicle');
    formData.append('field', 'photos');

    const postDataResponse = await axios.post(endPoints.vehicles, data, {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
    });

    const vehicleId = postDataResponse.data.data.id
    formData.append('refId', vehicleId);

    const postFilesResponse = await axios.post(endPoints.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (postFilesResponse.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: {
          postData: postDataResponse.data,
          filesData: postFilesResponse.data,
        },
        status: httpCodes.HTTP_OK,
      };
    } else {
      console.error('Failed to post files:', postFilesResponse);
      return {
        success: false,
        error: 'Failed to post files',
        status: postFilesResponse.status,
      };
    }
  } catch (error: any) {
    console.error('Error posting vehicle:', error);
    return {
      success: false,
      error,
    };
  }
}
export async function uploadFiles(files, ref, field, refId) {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append('ref', ref);
    formData.append('field', field);
    formData.append('refId', refId);

    const postFilesResponse = await axios.post(endPoints.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (postFilesResponse.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: {
          filesData: postFilesResponse.data,
        },
        status: httpCodes.HTTP_OK,
      };
    } else {
      console.error('Failed to post files:', postFilesResponse);
      return {
        success: false,
        error: 'Failed to post files',
        status: postFilesResponse.status,
        data: postFilesResponse
      };
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    return {
      success: false,
      error,
    };
  }
}


export async function deleteFiles(id) {
  try {
    const response = await axios.delete(`${endPoints.upload}/files/${id}`);
    return response;
  } catch (error) {
    console.error(`Error deleting files with ID ${id}:`, error);
    throw error;
  }
}

export async function searchVehicle(table, field,field2, query, searchInput) {
  try {
    const url =process.env.VUE_APP_API_BASE_URL
    const response = await axios.get(
      `${url}${table}?populate=*&filters[${field}][${field2}][${query}]=${searchInput}`
    );

    if (response) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      }
    } else {
      throw new Error("Failed to fetch vehicles");
    }
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return {
      success: false,
      error,
    };
  }
}
export async function search(table, field, query, searchInput) {
  try {
    const url =process.env.VUE_APP_API_BASE_URL
    const response = await axios.get(
      `${url}${table}?filters[${field}][${query}]=${searchInput}`
    );

    if (response) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      }
    } else {
      throw new Error("Failed to fetch vehicles");
    }
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return {
      success: false,
      error,
    };
  }
}
export async function searchInS(table, field, field2, query, searchInput) {
  try {
    const url = process.env.VUE_APP_API_BASE_URL
    const response = await axios.get(
      `${url}${table}?populate=deep&filters[${field}][${field2}][${query}]=${searchInput}`
    );

    if (response) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      }
    } else {
      throw new Error("Failed to fetch vehicles");
    }
  } catch (error) {
    console.error('Error getting vehicle:', error);
    return {
      success: false,
      error,
    };
  }
}



export async function updateVehicle(vehicleId, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.vehicles}/${vehicleId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update vehicle data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update vehicle data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return {
      success: false,
      error,
    };
  }
}



export async function fetchVilla(start = 0, limit = 5) {
  try {
    const response = await axios.get(`${endPoints.villa}/?populate=*&pagination[start]=${start}&pagination[limit]=${limit}`);
    if (response) {
      console.log(response.data)
      return response.data;
    } else {
      console.error("Failed to fetch villa:");
      throw new Error("Failed to fetch villa");
    }
  } catch (error) {
    console.error("Error fetching villa:", error);
    throw error;
  }
}

export async function deleteVilla(villaId) {
  try {
    const response = await axios.delete(`${endPoints.villa}/${villaId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting vehicle with ID ${villaId}:`, error);
    throw error;
  }
}


export async function fetchVillaCategories(query = "") {
  try {
    const response = await axios.get(`${endPoints.villaCategories}?${query}`);
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch villa ");
    }
  } catch (error) {
    console.error("Error fetching villa:", error);
    throw error;
  }
}


export async function postVilla(files, data) {
  try {
    console.log(Array.isArray(files), data, files.value);
    const formData = new FormData();

    files.value.forEach((file) => {
      formData.append(`files`, file);
    });
    formData.append('ref', 'api::villa.villa');
    formData.append('field', 'photos');

    const postDataResponse = await axios.post(endPoints.villa, data, {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
    });

    const villaId = postDataResponse.data.data.id
    formData.append('refId', villaId);

    const postFilesResponse = await axios.post(endPoints.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (postFilesResponse.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: {
          postData: postDataResponse.data,
          filesData: postFilesResponse.data,
        },
        status: httpCodes.HTTP_OK,
      };
    } else {
      console.error('Failed to post files:', postFilesResponse);
      return {
        success: false,
        error: 'Failed to post files',
        status: postFilesResponse.status,
      };
    }
  } catch (error: any) {
    console.error('Error posting Villa:', error);
    return {
      success: false,
      error,
    };
  }
}


export async function updateVilla(villaId, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.villa}/${villaId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update villa data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update villa data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating villa:', error);
    return {
      success: false,
      error,
    };
  }
}


export async function postVehicleCategory(Catgegory) {
  try {
    const response = await axios.post(endPoints.vehiclesCategories, Catgegory, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
export async function deleteVehicleCategory(id) {
  try {
    const response = await axios.delete(`${endPoints.vehiclesCategories}/${id}`);
    return {
      success: true,
      data: response.data,
      status: response.status
    }

  } catch (error) {
    console.error(`vehicle  with  ${id} deleted:`, error);
    throw error;
  }
}
export async function updateVehicleCategory(id, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.vehiclesCategories}/${id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return {
      success: true,
      data: response.data,
      status: response.status
    }

  } catch (error) {
    console.error(`vehicle  with  ${id} deleted:`, error);
    throw error;
  }
}
// updateVehicleCategory

export async function postVillaCategory(Catgegory) {
  try {
    const response = await axios.post(endPoints.villaCategories, Catgegory, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
export async function deleteVillaCategory(id) {
  try {
    const response = await axios.delete(`${endPoints.villaCategories}/${id}`);
    return {
      success: true,
      data: response.data,
      status: response.status
    }

  } catch (error) {
    console.error(`villa  with  ${id} deleted:`, error);
    throw error;
  }
}
export async function updateVillaCategory(id, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.villaCategories}/${id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    return {
      success: true,
      data: response.data,
      status: response.status
    }

  } catch (error) {
    console.error(`villa  with  ${id} deleted:`, error);
    throw error;
  }
}
export async function fetchContacts(query = "") {
  try {
    const response = await axios.get(`${endPoints.contacts}?${query}`);
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch contacts");
    }
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
}
export async function deleteContact(contactId) {
  try {
    const response = await axios.delete(`${endPoints.contacts}/contactId`);
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to delete contacts");
    }
  } catch (error) {
    console.error("Error delete contacts:", error);
    throw error;
  }
}
// http://localhost:1337/api/events
export async function fetchEvents(start = 0, limit = 16) {
  try {
    const response = await axios.get(`${endPoints.allEvents}`);
    if (response) {
      console.log(response.data)
      return response.data;
    } else {
      console.error("Failed to fetch events:");
      throw new Error("Failed to fetch events");
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

// http://localhost:1337/api/partners/1?populate=deep
export async function fetchPartnersById(id, start = 0, limit = 16) {
  try {
    const response = await axios.get(`${endPoints.partners}/${id}?populate=deep`);
    if (response) {
      console.log(response.data)
      return response.data;
    } else {
      console.error("Failed to fetch partners:");
      throw new Error("Failed to fetch partners");
    }
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
}
export async function fetchPartners(start = 0, limit = 16) {
  try {
    const response = await axios.get(`${endPoints.partners}?populate=deep&pagination[page]=1&pagination[pageSize]=10`);
    if (response) {
      console.log(response.data)
      return response.data;
    } else {
      console.error("Failed to fetch partners:");
      throw new Error("Failed to fetch partners");
    }
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
}
export async function fetchUserByPartner(id) {
  try {
    const url = `${endPoints.users}?filters[partner][id][$contains]=${id}`;
    console.log("Request URL:", url);

    const response = await axios.get(url);
    console.log("Response:", response);

    if (response && response.data) {
      console.log("Fetched users successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to fetch users.");
      throw new Error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function fetchReservations(start = 0, limit = 16) {
  try {
    const response = await axios.get(`${endPoints.reservations}?_start=${start}&_limit=${limit}&populate=deep`);
    if (response) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Failed to fetch reservations:");
      throw new Error("Failed to fetch reservations");
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
}

export async function deleteReservation(reservationId) {
  try {
    const response = await axios.delete(`${endPoints.reservations}/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting reservation with ID ${reservationId}:`, error);
    throw error;
  }
}
export async function acceptReservation(data) {
  try {
    const response = await axios.post(endPoints.accepted_reservations, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to accept:', response);
      return {
        success: false,
        error: 'Failed to accept',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error accepting:', error);
    return {
      success: false,
      error,
    };
  }
}


// /api/accepted-reservations

export async function deleteAcceptedReservation(reservationId) {
  try {
    const response = await axios.delete(`${endPoints.accepted_reservations}/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting acceptation reservation with ID ${reservationId}:`, error);
    throw error;
  }
}

export async function deteleFromReservation(reservationId) {
  try {
    const response = await axios.delete(`${endPoints.accepted_reservations}/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting acceptation reservation with ID ${reservationId}:`, error);
    throw error;
  }
}


export async function updateInReservation(reservationId, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.reservations}/${reservationId}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update reservation data:', response);
      return {
        success: false,
        error: 'Failed to update reservation data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    return {
      success: false,
      error,
    };
  }
}


export async function fetchAcceptedReservations(start = 0, limit = 16) {
  try {
    const response = await axios.get(`${endPoints.accepted_reservations}?_start=${start}&_limit=${limit}&populate=deep`);
    if (response) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Failed to fetch accepted reservations:");
      throw new Error("Failed to fetch accepted reservations");
    }
  } catch (error) {
    console.error("Error fetching accepted reservations:", error);
    throw error;
  }
}

export async function getFile(id) {
  try {
    const response = await axios.get(`${endPoints.upload}/files/${id}`);
    return response;
  } catch (error) {
    console.error(`Error getting files with ID ${id}:`, error);
    throw error;
  }
}
export async function getRole(RoleName) {
  try {
    const res = await axios(`${endPoints.roles}`)
    if (res.data) {
      res.data.roles = res.data.roles.filter(item => {

        return item.name.trim() === RoleName.trim()
      })
    }
    return {
      roles: res.data
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
export async function updateReservation(id, updatedData) {
  try {
    const response = await axios.put(
      `${endPoints.reservations}/${id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    console.log(response);
    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update reservation data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update reservation data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating reservation:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function postPartner(partner) {
  try {
    const response = await axios.post(endPoints.partners, partner, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
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
 export async function fetchMakesFiltre(query="") {
    try {
      let response  ;
  if(query){
        response = await axios.get(`${endPoints.makes}?populate=*&${query}`);
  }else{
        response = await axios.get(`${endPoints.makes}?populate[brands][populate]=vehicles&populate[vehicles]=*`);

  }
      if (response) {
         return response.data;
      } else {
         throw new Error("Failed to fetch makes");
      }
    } catch (error) {
      console.error("Error fetching makes:", error);
      throw error;
    }
  }
    export async function fetchBrandsFiltre(query="") {
    try {
      let response
      if(query){
        response = await axios.get(`${endPoints.brands}?populate=*&${query}`);
      }else{
        response = await axios.get(`${endPoints.brands}?populate=*`);

      }
      if (response) {
         return response.data;
      } else {
         throw new Error("Failed to fetch brands ");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  }
  export async function fetchMakes(query="") {
    try {
      let response  ;
  if(query){
        response = await axios.get(`${endPoints.makes}?populate=deep&${query}`);
  }else{
        response = await axios.get(`${endPoints.makes}?populate=deep`);

    }
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch makes");
    }
  } catch (error) {
    console.error("Error fetching makes:", error);
    throw error;
  }
}
export async function fetchBrands(query = "") {
  try {
    let response
    if (query) {
      response = await axios.get(`${endPoints.brands}?populate=deep&${query}`);
    } else {
      response = await axios.get(`${endPoints.brands}?populate=deep`);

    }
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch brands ");
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}
// http://localhost:1337/api/brands
export async function fetchBrandMyMake(id) {
  try {
    const response = await axios.get(`${endPoints.brands}?populate=deep&filters[make][id][$eq]=${id}`);
    if (response) {
      return response.data;
    } else {
      throw new Error("Failed to fetch brands ");
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
}
export async function postMake(make) {
  try {
    const postDataResponse = await axios.post(endPoints.makes, make, {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
    });
    if (postDataResponse) {
      return postDataResponse.data;
    } else {
      throw new Error("Failed to post make ");
    }
  } catch (error) {
    console.error("Error posting  make:", error);
    throw error;
  }
}
export async function postBrand(brand) {
  try {
    const postDataResponse = await axios.post(endPoints.brands, brand, {
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
    });
    if (postDataResponse) {
      return postDataResponse.data;
    } else {
      throw new Error("Failed to post brand ");
    }
  } catch (error) {
    console.error("Error posting  brand:", error);
    throw error;
  }
}
export async function editMake(makeId, updatedMakeData) {
  try {
    const response = await axios.put(
      `${endPoints.makes}/${makeId}`,
      updatedMakeData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update make data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update make data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating make:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function editBrand(brandId, updatedBrandData) {
  try {
    const response = await axios.put(
      `${endPoints.brands}/${brandId}`,
      updatedBrandData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update brand data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update brand data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating brand:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function deleteMake(makeId) {
  try {
    const response = await axios.delete(`${endPoints.makes}/${makeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting make with ID ${makeId}:`, error);
    throw error;
  }
}

export async function deleteBrand(brandId) {
  try {
    const response = await axios.delete(`${endPoints.brands}/${brandId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting brand with ID ${brandId}:`, error);
    throw error;
  }
}

export async function fetchTags(query = "") {
    try {
        let response;
        if (query) {
            response = await axios.get(`${endPoints.tags}?populate=deep&${query}`);
        } else {
            response = await axios.get(`${endPoints.tags}?populate=deep`);
        }

         if (response && response.data && response.data.length > 0) {
            return response.data;
        } else {
             return [];
        }
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw error;
    }
}

  export async function addTags(tagData) {
  try {
    const response = await axios.post(endPoints.tags, tagData);
    return response.data;
  } catch (error) {
    console.error('Error adding tags:', error);
    throw error;
  }
}

export async function deleteTags(tagId) {
  try {
    const response = await axios.delete(`${endPoints.tags}/${tagId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tag with ID ${tagId}:`, error);
    throw error;
  }
}

export async function updateTags(tagId, tagData) {
  try {
    const response = await axios.put(`${endPoints.tags}/${tagId}`, tagData);
    return response.data;
  } catch (error) {
    console.error(`Error updating tag with ID ${tagId}:`, error);
    throw error;
  }
}
export async function downloadItem({ url, label }) {
  try {
    const extension = await label.split('.').pop().toLowerCase();
    let type;
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        type = 'image/jpeg';
        break;
      case 'png':
        type = 'image/png';
        break;
      case 'gif':
        type = 'image/gif';
        break;
      default:
        type = 'application/octet-stream';
    }
    const blob = new Blob([url], { type });
    const link = await document.createElement('a');
    link.href = await URL.createObjectURL(blob);
    link.download = await label;
    await link.click();
    await URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}
export async function editStyle(styleId, updatedStyleData) {
  try {
    const response = await axios.put(
      `${endPoints.styles}/${styleId}`,
      updatedStyleData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (response.status === httpCodes.HTTP_OK) {
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } else {
      console.error('Failed to update style data:', response);
      return {
        data: response,
        success: false,
        error: 'Failed to update style data',
        status: response.status,
      };
    }
  } catch (error) {
    console.error('Error updating style:', error);
    return {
      success: false,
      error,
    };
  }
}

export async function deleteStyle(styleId) {
  try {
    const response = await axios.delete(`${endPoints.styles}/${styleId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting style with ID ${styleId}:`, error);
    throw error;
  }
}

export async function fetchStyles(query = "") {
    try {
        let response;
        if (query) {
            response = await axios.get(`${endPoints.styles}?${query}`);
        } else {
            response = await axios.get(`${endPoints.styles}`);
        }

         if (response ) {
            return response.data;
        } else {
             return [];
        }
    } catch (error) {
        console.error("Error fetching styles:", error);
        throw error;
    }
}

export async function addStyle(styleData) {
  try {
    const response = await axios.post(endPoints.styles, styleData);
    return response.data;
  } catch (error) {
    console.error('Error adding style:', error);
    throw error;
  }
}
export async function allVehiclesApi(filters) {
  try {
    let queryParams = `populate=*`;
    const filterKeys = Object.keys(filters);

    filterKeys.forEach((key) => {
  const value = filters[key];
  if (value !== undefined && value !== null) {
    if (Array.isArray(value)) {
      if (key === 'daily' && value.length === 2) {
        const [minDaily, maxDaily] = value;
        queryParams += `&filters[${key}][$gte]=${minDaily}&filters[${key}][$lte]=${maxDaily}`;
      } else {
        value.forEach((v) => {
          if (key === 'make' || key === 'brand') {
            queryParams += `&filters[${key}][name][$contains]=${v}`;
          } else {
            queryParams += `&filters[${key}][name][$contains]=${v}`;
          }
        });
      }
    } else {
      if (key === 'make' || key === 'brand') {
        queryParams += `&filters[${key}][name][$contains]=${value}`;
      } else if (key === 'searchQuery') {
        queryParams += `&filters[$or][0][make][name][$contains]=${value}&filters[$or][1][brand][name][$contains]=${value}`;
      } else {
        queryParams += `&filters[${key}][name][$contains]=${value}`;
      }
    }
  }
});


    const response = await axios.get(`${endPoints.vehicles}?${queryParams}`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch vehicles");
    }
  } catch (error) {
    console.error('Error getting vehicles:', error);
    return {
      success: false,
      error,
    };
  }
}
