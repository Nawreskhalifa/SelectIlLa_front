import { decodeApiToEvent } from "@/models/Event/Event";
import { makeApiRequest } from "@/services/apiService";
import { endPoints } from "@/utils/endPoints";
import { methodsHttpNames } from "@/utils/methods";
const state = {
  eventsError: null,
  eventsLoading: false,
  events: [],
  event: null,
  totalPages: 1,
  totalItems: 0,
  open: false
};
const getters = {
  getEventsError: (state) => state.eventsError,
  getEventsLoading: (state) => state.eventsLoading,
  getEvents: (state) => state.events,
  getEvent: (state) => state.event,
  getTotalPages: (state) => state.totalPages,
  getTotalItems: (state) => state.totalItems,
  isOpen: (state) => state.open
};
const mutations = {
  SET_TOTAL_ITEMS(state, payload = 0) {
    state.totalItems = payload;
  },
  SET_TOTAL_PAGES(state, payload = 1) {
    state.totalPages = payload;
  },
  SET_EVENTS_LOADING(state, payload = false) {
    state.eventsLoading = payload;
  },
  SET_EVENTS_ERROR(state, payload = null) {
    state.eventsError = payload;
  },
  SET_EVENTS(state, payload) {
    state.events = payload;
  },
  REMOVE_EVENT(state, id) {
    state.events = state.events.filter((event) => event.id !== id);
  },
  SET_EVENT(state, payload = null) {
    state.event = payload;
  },
  ADD_EVENT(state, payload) {
    state.events.push(payload);
  },
  UPDATE_EVENT(state, { event, data }) {
    event.updateEvent(data);
  },
  updateOpen(state) {
    state.open = !state.open
  }
};
const actions = {
  async updateEvent({ commit }, { body, event }) {
    commit("SET_EVENTS_LOADING", true);
    commit("SET_EVENTS_ERROR");
    try {
      commit("UPDATE_EVENT", {
        event,
        data: decodeApiToEvent(body),
      });
      commit("SET_EVENTS_LOADING");
    } catch (error: any) {
      commit("SET_EVENTS_LOADING");
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.messages
      ) {
        commit("SET_EVENTS_ERROR", error.response.data.error.messages);
      } else {
        commit("SET_EVENTS_ERROR", ["Une erreur est survenue"]);
      }
      return false;
    }
    return true;
  },
  async fetchAllEvents({ commit }, { page, perPage = 25, name, isActive = 'All' }: { page: number, perPage?: number, name: string | null, isActive?: string }) {
    commit("SET_EVENTS_LOADING", true);
    commit("SET_EVENTS_ERROR");

    try {
      const filters: {
        populate: any[];
        pagination?: { page: number; pageSize: number };
        filters?: {
          $or?: Array<{
            name?: { $contains: string };
            description?: { $contains: string };
            location?: { $contains: string };
            category_events?: { name?: { $contains: string } };
            partner?: { name?: { $contains: string }; surname?: { $contains: string } };
          }>;
          active?: { $eq: boolean };
        };
      } = {
        populate: [],
      };

      filters.populate = [
        'category_events',
        'photos',
        'partner',
        // 'seoData.sharedImage.media',
      ];

      if (page) {
        filters.pagination = { page: page, pageSize: perPage };
      }

      // Add the filters if name is specified
      if (name) {
        filters.filters = {
          ...(filters.filters || {}),
          $or: [
            { name: { $contains: name } },
            { description: { $contains: name } },
            { location: { $contains: name } },
            { category_events: { name: { $contains: name } } },
            { partner: { name: { $contains: name } } },
            { partner: { surname: { $contains: name } } }
          ]
        };
      }

      // Add the active filter if specified
      if (isActive !== 'All') {
        filters.filters = {
          ...(filters.filters || {}),
          active: { $eq: isActive === 'true' }
        };
      }



      const response = await makeApiRequest(
        methodsHttpNames.GET,
        endPoints.allEvents,
        undefined,
        filters
      );

      if (response.success) {
        commit("SET_TOTAL_PAGES", response.data.meta.pagination.pageCount);
        commit("SET_TOTAL_ITEMS", response.data.meta.pagination.total);
        commit("SET_EVENTS", response.data.data.map(decodeApiToEvent));
        commit("SET_EVENTS_LOADING", false);
      }
      return true;
    } catch (error: any) {
      commit("SET_EVENTS_LOADING", false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.messages
      ) {
        commit("SET_EVENTS_ERROR", error.response.data.error.messages);
      } else {
        commit("SET_EVENTS_ERROR", ["Une erreur est survenue"]);
      }
      return false;
    }
  },

  async deleteEvent({ commit }, id) {
    commit("SET_EVENTS_LOADING", true);
    commit("SET_EVENTS_ERROR");
    try {
      const response = await makeApiRequest(
        methodsHttpNames.DELETE,
        `${endPoints.findEvent}/${id}`,
        undefined,
        undefined
      );
      if (response.success) {
        commit("REMOVE_EVENT", id);
        commit("SET_EVENTS_LOADING");
      }
    } catch (error: any) {
      commit("SET_EVENTS_LOADING");
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.messages
      ) {
        commit("SET_EVENTS_ERROR", error.response.data.error.messages);
      } else {
        commit("SET_EVENTS_ERROR", ["Une erreur est survenue"]);
      }
      return false;
    }
    return true;
  },
  async fetchOneEvent({ commit }, idCategory) {
    commit("SET_EVENTS_LOADING", true);
    commit("SET_EVENTS_ERROR");
    try {
      const response = await makeApiRequest(
        methodsHttpNames.GET,
        `${endPoints.findEvent}/${idCategory}?populate=*`,
        undefined,
        undefined
      );
      commit("SET_EVENT", decodeApiToEvent(response.data.data));
      commit("SET_EVENTS_LOADING");
    } catch (error: any) {
      commit("SET_EVENTS_LOADING");
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.messages
      ) {
        commit("SET_EVENTS_ERROR", error.response.data.error.messages);
      } else {
        commit("SET_EVENTS_ERROR", ["Une erreur est survenue"]);
      }
      return false;
    }
    return true;
  },
  async addEvent({ commit }, payload) {
    commit("SET_EVENTS_LOADING", true);
    commit("SET_EVENTS_ERROR");
    try {
      commit("ADD_EVENT", decodeApiToEvent(payload));
      commit("SET_EVENTS_LOADING");
    } catch (error: any) {
      commit("SET_EVENTS_LOADING");
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.messages
      ) {
        commit("SET_EVENTS_ERROR", error.response.data.error.messages);
      } else {
        commit("SET_EVENTS_ERROR", ["Une erreur est survenue"]);
      }
      return false;
    }
    return true;
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};