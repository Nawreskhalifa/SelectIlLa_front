 import { fetchPartnersById ,fetchPartners} from "@/services/apiService";

const state = {
  partner: null,
   cachedPartners: []
};

const getters = {
  getPartner: (state) => state.partner,
  getCachedPartners(state) {
      return state.cachedPartners;
    }
};

const mutations = {
  setPartner(state, partner) {
    state.partner = partner;
  },
  updateCachedPartners(state, partners) {
      state.cachedPartners = partners;
    },

};

const actions = {
   async fetchPartners(context) {
      try {
         const partners = await fetchPartners();
        context.commit('updateCachedPartners', partners);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    },
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
