 import { fetchPartnersById } from "@/services/apiService";

const state = {
  partner: null,
};

const getters = {
  getPartner: (state) => state.partner,
};

const mutations = {
  setPartner(state, partner) {
    state.partner = partner;
  },
};

const actions = {
  async fetchPartnerById({ commit }, id) {
    try {
      const response = await fetchPartnersById(id);
      if (response) {
        commit("setPartner", response.data);
      }
    } catch (error) {
      console.error("Error fetching partner by ID:", error);
    }
  },
};

 export default {
  state,
  getters,
  mutations,
  actions,
};
