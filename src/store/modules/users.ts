import { decodeUsers } from '@/models/User/User'
import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'
import { decodeCustomer } from '@/models/Customer/Customer'
import { decodePartner } from '@/models/Partner/Partner'

const state = {
    userError: null,
    userLoading: false,
    users: [],
    customers: [],
    partners: [],
    totalPages: 1,
    totalItems: 0,
    customer: null,
    documents: [],
    totalPagesReservation: 0,
    totalItemsReservation: 0,
    reservation: null,
    documentsCustomer: [],
    allDocuments: [],
}
const getters = {
    getUsersError: state => state.userError,
    getUsersLoading: state => state.userLoading,
    getUsers: state => state.users,
    getCustomers: state => state.customers,
    getPartners: state => state.partners,
    getTotalPages: (state) => state.totalPages,
    getTotalItems: (state) => state.totalItems,
    getCustomer: (state) => state.customer,
    getDocuments: (state) => state.documents,
    getTotalPagesReservation: (state) => state.totalPagesReservation,
    getTotalItemsReservation: (state) => state.totalItemsReservation,
    getReservation: (state) => state.reservation,
    getDocumentsCustomer: (state) => state.documentsCustomer,
    getAllDocuments: (state) => state.allDocuments,


}
const mutations = {
    SET_ALL_DOCUMENTS(state, payload) {
        state.allDocuments = payload;
    },
    SET_DOCUMENTS_CUSTOMER(state, payload) {
        state.documentsCustomer = payload;
    },
    SET_TOTAL_ITEMS(state, payload = 0) {
        state.totalItems = payload;
    },
    SET_TOTAL_PAGES(state, payload = 1) {
        state.totalPages = payload;
    },
    SET_TOTAL_ITEMS_RESERVATION(state, payload = 0) {
        state.totalItemsReservation = payload;
    },
    SET_TOTAL_PAGES_RESERVATION(state, payload = 1) {
        state.totalPagesReservation = payload;
    },
    SET_USERS_LOADING(state, payload = false) {
        state.usersLoading = payload
    },
    SET_USERS_ERROR(state, payload = null) {
        state.usersError = payload
    },
    SET_USERS(state, payload) {
        state.users = payload
    },
    SET_CUSTOMERS(state, payload) {
        state.customers = payload
    },
    SET_CUSTOMER(state, payload) {
        state.customer = payload
    },
    SET_PARTNERS(state, payload) {
        state.partners = payload
    },
    REMOVE_CUSTOMER(state, id) {
        state.customers = state.customers.filter(customer => customer.id != id)
    },
    ADD_CUSTOMER(state, payload) {
        state.customers.push(payload)
    },
    SET_DOCUMENTS(state, payload) {
        state.documents = payload
    },
    SET_RESERVATION(state, payload) {
        state.reservation = payload
    },
    UPDATE_RESERVATION(state, { reservation, data }) {
        reservation.updateReservation(data);
    },
}
const actions = {
    async updateReservation({ commit }, { body, reservation }) {
        commit("SET_USERS_LOADING", true);
        commit("SET_USERS_ERROR");
        try {
            commit("UPDATE_RESERVATION", {
                reservation,
                data: body,
            });
            commit("SET_USERS_LOADING", false);
        } catch (error: any) {
            commit("SET_USERS_LOADING");
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_USERS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_USERS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    },
    async fetchAllUsers({ commit }) {
        commit('SET_USERS_LOADING', true)
        commit('SET_USERS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allUsers,
                undefined,
                undefined
            );
            if (response.success) {

                commit('SET_USERS', decodeUsers(response.data))
                commit('SET_USERS_LOADING')

            }

        } catch (error: any) {
            commit('SET_USERS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_USERS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async fetchAllCustomers({ commit }, { page = null, perPage = 25, name, gender = 'All', startDate, endDate, sortDirectionUserName, sortDirectionLocation }: { page?: number | null; perPage?: number; name: string | null, gender?: string, startDate?: number, endDate?: number, sortDirectionUserName?: string, sortDirectionLocation?: string }) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {
            const filters: {
                populate: any[];
                pagination?: { page?: number; pageSize?: number };
                filters?: {
                    $or?: Array<{
                        name?: { $contains: string };
                        surname?: { $contains: string };
                        phone?: { $contains: string };
                        driver_license?: { $contains: string };
                        Insurance?: { $contains: string };
                        address?: { $contains: string };
                        user?: { email?: { $contains: string }, username?: { $contains: string }, gender?: { $eq: string }, date_of_birth?: { $between?: [string, string] } };
                    }>;
                    user?: { $and?: Array<{ gender?: { $eq: string }, date_of_birth?: { $gte?: string, $lte?: string } }>; };
                };
                sort?: string[];


            } = {
                populate: ['user', 'user.photo'],
                sort: []

            };
            if (page !== undefined && page !== null) {
                filters.pagination = { page: page, pageSize: perPage };
            }

            // Add the filters if name is specified
            if (name) {
                filters.filters = {
                    $or: [
                        { name: { $contains: name } },
                        { surname: { $contains: name } },
                        { phone: { $contains: name } },
                        { driver_license: { $contains: name } },
                        { Insurance: { $contains: name } },
                        { address: { $contains: name } },
                        { user: { email: { $contains: name }, username: { $contains: name } } },
                    ],
                };
            } else {
                // If no specific name provided, clear filters
                filters.filters = {};
            }

            // Add the gender filter if specified
            if (gender !== 'All') {
                // Assurez-vous que filters.filters.user est défini avant d'ajouter le filtre de genre
                filters.filters.user = filters.filters.user || {};
                filters.filters.user.$and = filters.filters.user.$and || [];
                filters.filters.user.$and.push({ gender: { $eq: gender } });
            }
            // Add date of birth filter if startDate and endDate are specified
            if (startDate) {
                filters.filters.user = filters.filters.user || {};
                filters.filters.user.$and = filters.filters.user.$and || [];
                filters.filters.user.$and.push({ date_of_birth: { $gte: startDate.toString() } });
            }
            if (endDate) {
                filters.filters.user = filters.filters.user || {};
                filters.filters.user.$and = filters.filters.user.$and || [];
                filters.filters.user.$and.push({ date_of_birth: { $lte: endDate.toString() } });
            }
            // Add sorting options
            if (sortDirectionUserName) {
                // Assuming user is the nested object containing username
                if (filters.sort) {
                    filters.sort.push(`name:${sortDirectionUserName}`);
                    filters.sort.push(`surname:${sortDirectionUserName}`);
                }
            }
            // Add sorting options
            if (sortDirectionLocation) {
                // Assuming user is the nested object containing username
                if (filters.sort) {
                    filters.sort.push(`address:${sortDirectionLocation}`);
                }
            }
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allCustomers,
                undefined,
                filters
            );

            if (response.success) {
                commit("SET_TOTAL_PAGES", response.data.meta.pagination.pageCount);
                commit("SET_TOTAL_ITEMS", response.data.meta.pagination.total);
                commit('SET_CUSTOMERS', response.data.data.map(decodeCustomer));
                commit('SET_USERS_LOADING', false);
            }
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.messages) {
                commit('SET_USERS_ERROR', error.response.data.error.messages);
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue']);
            }
            return false;
        }
        return true;
    },
    async fetchOneCustomer({ commit }, id) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.deleteCustomer}${id}?populate=deep`,
                undefined,
                undefined
            );
            if (response.success) {
                commit('SET_CUSTOMER', response.data.data);
                commit('SET_USERS_LOADING', false);
            }
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.messages) {
                commit('SET_USERS_ERROR', error.response.data.error.messages);
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue']);
            }
            return false;
        }
        return true;
    },
    async AddNewCustomer({ commit },) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {

            const response = await makeApiRequest(
                methodsHttpNames.POST,
                endPoints.allCustomers,
                undefined,
                undefined
            );

            if (response.success) {
                console.log(response);

                commit('ADD_CUSTOMER', decodeCustomer(response.data.data));
                commit('SET_USERS_LOADING', false)
            }
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.messages) {
                commit('SET_USERS_ERROR', error.response.data.error.messages);
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue']);
            }
            return false;
        }
        return true;
    },
    async fetchAllPartners({ commit }) {
        commit('SET_USERS_LOADING', true)
        commit('SET_USERS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allPartners,
                undefined,
                undefined
            );
            console.log(response.data)
            if (response.success) {
                commit('SET_PARTNERS', response.data)
                commit('SET_USERS_LOADING')
            }

        } catch (error: any) {
            commit('SET_USERS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_USERS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async deleteCustomer({ commit }, id) {
        commit('SET_USERS_LOADING', true)
        commit('SET_USERS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.DELETE,
                `${endPoints.deleteCustomer}${id}`,
                undefined,
                undefined
            );
            if (response.success) {

                commit('REMOVE_CUSTOMER', id)
                commit('SET_USERS_LOADING')
            }

        } catch (error: any) {
            commit('SET_USERS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_USERS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async fetchDocumentsCustomer({ commit }, id) {
        commit('SET_USERS_LOADING', true)
        commit('SET_USERS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.deleteCustomer}${id}`,
                undefined,
                { populate: { documents: true } }
            );
            if (response.success) {
                commit('SET_DOCUMENTS_CUSTOMER', response.data.data.attributes.documents)
                commit('SET_USERS_LOADING')
            }

        } catch (error: any) {
            commit('SET_USERS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_USERS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async fetchAllAttachmentsByCustomer({ commit }, { page = 1, perPage = 25, idCustomer, status }: { page?: number, perPage?: number, idCustomer: number, status?: string }) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {
            let filters: any = { customer: { id: { $eq: idCustomer } } };

            // Ajouter la condition pour le statut uniquement s'il n'est pas nul
            if (status && status !== '') {
                filters = { ...filters, status: { $eq: status } };
            }
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}?populate=deep`,
                undefined,
                { filters, pagination: { page: page, pageSize: perPage } }
            );
            if (response.success) {
                commit("SET_TOTAL_PAGES_RESERVATION", response.data.meta.pagination.pageCount);
                commit("SET_TOTAL_ITEMS_RESERVATION", response.data.meta.pagination.total);
                commit('SET_DOCUMENTS', response.data.data);
                commit('SET_USERS_LOADING', false);
            }
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.messages) {
                commit('SET_USERS_ERROR', error.response.data.error.messages);
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue']);
            }
            return false;
        }
        return true;
    },
    async fetchOneReservation({ commit }, idReservation) {
        commit("SET_USERS_LOADING", true);
        commit("SET_USERS_ERROR");
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}/${idReservation}?populate=deep`,
                undefined,
                undefined
            );
            console.log(response.data)
            commit("SET_RESERVATION", response.data.data);
            commit('SET_USERS_LOADING', false);
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit("SET_USERS_ERROR", error.response.data.error.messages);
            } else {
                commit("SET_USERS_ERROR", ["Une erreur est survenue"]);
            }
            return false;
        }
        return true;
    },
    async fetchAllDocumentsByCustomer({ commit }, { idCustomer }) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {
            const filters: any = { customer: { id: { $eq: idCustomer } } };


            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}?populate=deep`,
                undefined,
                { filters }
            );
            if (response.success) {
                const result: any = { data: [] };
                if (response.data.data && response.data.data.length) {
                    response.data.data.forEach(element => {
                        if (element.attributes.documents.data && element.attributes.documents.data.length) {
                            element.attributes.documents.data.forEach(elt => {
                                result.data.push(elt); // Ajout de l'élément à result.data
                            });
                        }
                    });
                }
                commit('SET_ALL_DOCUMENTS', result);
                commit('SET_USERS_LOADING', false);
            }
        } catch (error: any) {
            commit('SET_USERS_LOADING', false);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.messages) {
                commit('SET_USERS_ERROR', error.response.data.error.messages);
            } else {
                commit('SET_USERS_ERROR', ['Une erreur est survenue']);
            }
            return false;
        }
        return true;
    },

}
export default {
    state,
    getters,
    mutations,
    actions
}