// Import necessary dependencies and constants
import { makeApiRequest } from '@/services/apiService';
import { endPoints } from '@/utils/endPoints';
import { methodsHttpNames } from '@/utils/methods';

const state = {
  vehicleError: null,
  vehicleLoading: false,
  vehicles: [],
  totalPages: 1,
  totalItems: 0,
};

const getters = {
  getVehicleError: state => state.vehicleError,
  getVehicleLoading: state => state.vehicleLoading,
  getVehicles: state => state.vehicles,
  getTotalPages: state => state.totalPages,
  getTotalItems: state => state.totalItems,
};

const mutations = {
  SET_VEHICLE_ERROR(state, payload) {
    state.vehicleError = payload;
  },
  SET_VEHICLE_LOADING(state, payload) {
    state.vehicleLoading = payload;
  },
  SET_VEHICLES(state, payload) {
    state.vehicles = payload;
  },
  SET_TOTAL_PAGES(state, payload = 1) {
    state.totalPages = payload;
  },
  SET_TOTAL_ITEMS(state, payload = 0) {
    state.totalItems = payload;
  },
};

const actions = {
  async fetchAllVehicles({ commit }, { page = null, perPage = 25, make = null, brand = null, minPrice = null, maxPrice = null , searchInput=null  }) {
    commit('SET_VEHICLE_LOADING', true);
    commit('SET_VEHICLE_ERROR', null);
    try {
      const filters = {
        pagination: { page, pageSize: perPage },
        filters: {
          make: make ? { $eq: make } : undefined,
          brand: brand ? { $eq: brand } : undefined,
           daily: minPrice && maxPrice ? { $between: [minPrice, maxPrice] } : undefined,
        },
      };
      const response = await makeApiRequest(
        methodsHttpNames.GET,
        endPoints.vehicles,
        undefined,
        filters
      );
      if (response.success) {
        commit('SET_VEHICLES', response.data.data);
        commit('SET_TOTAL_PAGES', response.data.meta.pagination.pageCount);
        commit('SET_TOTAL_ITEMS', response.data.meta.pagination.total);
        commit('SET_VEHICLE_LOADING', false);
      }
    } catch (error) {
      commit('SET_VEHICLE_LOADING', false);
      commit('SET_VEHICLE_ERROR', 'An error occurred while fetching vehicles.');
      console.error('Error fetching vehicles:', error);
    }
  },
 };

export default {
  state,
  getters,
  mutations,
  actions
};
