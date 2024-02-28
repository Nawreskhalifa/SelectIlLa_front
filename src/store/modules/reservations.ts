import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'

const state = {
    reservationError: null,
    reservationLoading: false,
    totalPagesOfReservation: 0,
    totalItemsOfReservation: 0,
    reservations: [],
    allReservations: [],


}
const getters = {
    getReservationError: state => state.reservationError,
    getReservationLoading: state => state.reservationLoading,
    getAllReservations: state => state.reservations,
    getTotalPagesOfReservation: (state) => state.totalPagesOfReservation,
    getTotalItemsOfReservation: (state) => state.totalItemsOfReservation,
    getAllReservationsWithoutPagination: (state) => state.allReservations
}
const mutations = {
    SET_TOTAL_ITEMS_RESERVATION(state, payload = 0) {
        state.totalItemsOfReservation = payload;
    },
    SET_TOTAL_PAGES_RESERVATION(state, payload = 1) {
        state.totalPagesOfReservation = payload;
    },
    SET_RESERVATIONS_LOADING(state, payload = false) {
        state.reservationLoading = payload
    },
    SET_RESERVATIONS_ERROR(state, payload = null) {
        state.reservationError = payload
    },
    SET_RESERVATION(state, payload) {
        state.reservation = payload
    },
    SET_RESERVATIONS(state, payload) {
        state.reservations = payload
    },
    SET_ALL_RESERVATIONS(state, payload) {
        state.allReservations = payload
    },
    REMOVE_RESERVATION(state, id) {
        state.reservations = state.reservations.filter((reservation) => reservation.id !== id);
    },
    UPDATE_RESERVATION(state, { event, data }) {
        event.updateReservation(data);
    },

}
const actions = {
    async updateReservation({ commit }, { body, event }) {
        commit("SET_RESERVATIONS_LOADING", true);
        commit("SET_RESERVATIONS_ERROR");
        try {
            commit("UPDATE_EVENT", {
                event,
                data: body,
            });
            commit("SET_RESERVATIONS_LOADING", false);
        } catch (error: any) {
            commit("SET_RESERVATIONS_LOADING", false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_RESERVATIONS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_RESERVATIONS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    },
    async deleteReservation({ commit }, id) {
        commit("SET_RESERVATIONS_LOADING", true);
        commit("SET_RESERVATIONS_ERROR");
        try {
            const response = await makeApiRequest(
                methodsHttpNames.DELETE,
                `${endPoints.reservations}/${id}`,
                undefined,
                undefined
            );
            if (response.success) {
                commit("REMOVE_RESERVATION", id);
                commit("SET_RESERVATIONS_LOADING", false);
                commit("SET_RESERVATIONS_ERROR");
            }
        } catch (error: any) {
            commit("SET_RESERVATIONS_LOADING");
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_RESERVATIONS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_RESERVATIONS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    },
    async fetchAllReservationsWithoutPagination({ commit }) {
        commit("SET_RESERVATIONS_LOADING", true);
        commit("SET_RESERVATIONS_ERROR");
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}?populate=deep`,
                undefined,
                undefined
            );
            commit("SET_ALL_RESERVATIONS", response.data.data);
            commit('SET_RESERVATIONS_LOADING', false);
        } catch (error: any) {
            commit('SET_RESERVATIONS_LOADING', false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_RESERVATIONS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_RESERVATIONS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    },
    async fetchAllReservations({ commit }, { page, perPage = 25, name, partnerId, customerId, startDate, endDate, status }: { page: number, perPage?: number, name?: string, partnerId?: number, customerId?: number, startDate?: string, endDate?: string, status?: string }) {
        commit("SET_RESERVATIONS_LOADING", true);
        commit("SET_RESERVATIONS_ERROR");
        try {
            const filters: {
                pagination?: { page: number; pageSize: number };
                filters?: {
                    $or?: Array<{
                        pickup_location?: { $contains: string };
                        drop_off_location?: { $contains: string };
                        total_amount?: { $contains: string };
                        vehicle?: { brand?: { name: { $contains: string }, make?: { name: { $contains: string } } } };
                        event?: { name?: { $contains: string } };
                        villa?: { name?: { $contains: string } };
                    }>;
                    $and?: Array<{
                        $or?: Array<{
                            event?: { partner?: { id: { $eq: number } } },
                            villa?: { partner?: { id: { $eq: number } } },
                            vehicle?: { partner?: { id: { $eq: number } } },
                        }>;

                        customer?: { id: { $eq: number } },
                        pickup_date?: { $gte?: string },
                        drop_off_date?: { $lte?: string },
                        status?: { $eq?: string }
                    }>;
                };
                sort?: string[];
            } = { sort: ['updatedAt:desc'] };

            if (page) {
                filters.pagination = { page: page, pageSize: perPage };
            }

            if (name || partnerId || customerId || startDate || endDate || status) {
                filters.filters = {};
                filters.filters.$and = [];

                if (name) {
                    filters.filters.$or = [
                        { pickup_location: { $contains: name } },
                        { drop_off_location: { $contains: name } },
                        { total_amount: { $contains: name } },
                        { vehicle: { brand: { name: { $contains: name }, make: { name: { $contains: name } } } } },
                        { event: { name: { $contains: name } } },
                        { villa: { name: { $contains: name } } }

                    ];
                }

                if (partnerId && partnerId > 0) {
                    // Correction des propriétés $or en tant que tableau
                    filters.filters.$and.push({
                        $or: [
                            { event: { partner: { id: { $eq: partnerId } } } },
                            { villa: { partner: { id: { $eq: partnerId } } } },
                            { vehicle: { partner: { id: { $eq: partnerId } } } }
                        ]
                    });
                }

                if (customerId && customerId > 0) {
                    filters.filters.$and.push({ customer: { id: { $eq: customerId } } });
                }
                if (startDate) {
                    filters.filters.$and.push({ pickup_date: { $gte: startDate } });
                }

                if (endDate) {
                    filters.filters.$and.push({ drop_off_date: { $lte: endDate } });
                }

                if (status !== 'All') {
                    filters.filters.$and.push({ status: { $eq: status } });
                }
            }

            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}?populate=deep`,
                undefined,
                filters
            );
            commit("SET_TOTAL_PAGES_RESERVATION", response.data.meta.pagination.pageCount);
            commit("SET_TOTAL_ITEMS_RESERVATION", response.data.meta.pagination.total);
            commit("SET_RESERVATIONS", response.data.data);
            commit('SET_RESERVATIONS_LOADING', false);
        } catch (error: any) {
            commit('SET_RESERVATIONS_LOADING', false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_RESERVATIONS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_RESERVATIONS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    }



}
export default {
    state,
    getters,
    mutations,
    actions
}