import { decodeUsers } from '@/models/User/User'
import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'
import { decodeCustomer, decodeCustomers } from '@/models/Customer/Customer'
import { decodePartner, decodePartners } from '@/models/Partner/Partner'

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
}
const mutations = {
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
    //   SET_ONE_user_OF_PROJECT(state, payload) {
    //     state.userOfProject = payload
    //       ? payload.map(user => user.create(user))
    //       : payload
    //   },
    //   UPDATE_user(state, { user, data }) {
    //     user.updateuser(data)
    //   },
    //   REMOVE_user(state, id) {
    //     state.userOfProject = state.userOfProject.filter(type => type.id != id)
    //   }
}
const actions = {
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
    async fetchAllCustomers({ commit }, { page = null, perPage = 25, name, gender = 'All', startYear, endYear, sortDirectionUserName, sortDirectionLocation }: { page?: number | null; perPage?: number; name: string | null, gender?: string, startYear?: number, endYear?: number, sortDirectionUserName?: string, sortDirectionLocation?: string }) {
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
                    user?: { gender?: { $eq: string }, date_of_birth?: { $between?: [string, string] } };
                };
                sort?: string[];


            } = {
                populate: ['user', 'user.photo'],
                sort: []

            };
            if (page!==undefined && page !== null) {
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
                // Make sure filters.filters.user is defined before adding gender filter
                filters.filters.user = filters.filters.user || {};
                filters.filters.user.gender = { $eq: gender };
            }
            // Add date of birth filter if startYear and endYear are specified
            if (startYear && endYear) {
                filters.filters.user = filters.filters.user || {};
                filters.filters.user.date_of_birth = {
                    $between: [
                        new Date(`${startYear}-01-01T00:00:00.000Z`).toISOString(),
                        new Date(`${endYear}-12-31T23:59:59.999Z`).toISOString()
                    ]
                };
            }
            // Add sorting options
            if (sortDirectionUserName) {
                // Assuming user is the nested object containing username
                if (filters.sort) {
                    filters.sort.push(`name:${sortDirectionUserName}`);
                    filters.sort.push(`surname:${sortDirectionUserName}`);
                }

                console.log(filters)
            }
            // Add sorting options
            if (sortDirectionLocation) {
                // Assuming user is the nested object containing username
                if (filters.sort) {
                    filters.sort.push(`address:${sortDirectionLocation}`);
                }

                console.log(filters)
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
                commit('SET_PARTNERS', response.data.map(decodePartner))
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
    async fetchAllAttachmentsByCustomer({ commit }, { page = 1, perPage = 25, idCustomer }: { page?: number, perPage?: number, idCustomer: number }) {
        commit('SET_USERS_LOADING', true);
        commit('SET_USERS_ERROR', null);
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.reservations}?populate=*`,
                undefined,
                { filters: { customer: { id: { $eq: idCustomer } } }, pagination: { page: page, pageSize: perPage } }
            );
            if (response.success) {
                console.log(response.data.data)
                for (const attachment of response.data.data) {
                    // Traitez chaque pièce jointe ici
                    console.log(attachment.attributes.documents.data);
                }
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
    //   async fetchOneTypeuserOfProject({ commit }, user_id) {
    //     commit('SET_user_LOADING', true)
    //     commit('SET_user_ERROR')
    //     try {
    //       const params = {
    //         projet_id: user_id
    //       }
    //       const response = await axios.get(domain + '/api/users', {
    //         headers: {
    //           Authorization: `Bearer ${this.state.currentUser.token}`
    //         },
    //         params: params
    //       })
    //       commit('SET_ONE_user_OF_PROJECT', response.data.users)
    //       commit('SET_user_LOADING')
    //     } catch (error) {
    //       commit('SET_user_LOADING')
    //       if (
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.error &&
    //         error.response.data.error.messages
    //       ) {
    //         commit('SET_user_ERROR', error.response.data.error.messages)
    //       } else {
    //         commit('SET_user_ERROR', ['Une erreur est survenue'])
    //       }
    //       return false
    //     }
    //     return true
    //   },
    //   async adduser({ commit }, payload) {
    //     commit('SET_user_LOADING', true)
    //     commit('SET_user_ERROR')
    //     const body = {
    //       designation: payload.name,
    //       detail: payload.detail,
    //       start_date: payload.start,
    //       end_date: payload.end,
    //       projet_id: payload.projet_id
    //     }
    //     if (payload.start_time) {
    //       body.start_time = payload.start_time
    //     }
    //     if (payload.end_time) {
    //       body.end_time = payload.end_time
    //     }
    //     if (payload.type) {
    //       body.type_user_id =
    //         payload.type && payload.type.id ? payload.type.id : payload.type
    //     }
    //     if (payload.fields && payload.fields.length) {
    //       body.fields = payload.fields
    //     }
    //     try {
    //       const response = await axios.post(domain + '/api/users', body, {
    //         headers: {
    //           Authorization: `Bearer ${this.state.currentUser.token}`
    //         }
    //       })
    //       commit('ADD_user', response.data.data)
    //       commit('SET_user_LOADING')
    //     } catch (error) {
    //       commit('SET_user_LOADING')
    //       if (
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.error &&
    //         error.response.data.error.messages
    //       ) {
    //         commit('SET_user_ERROR', error.response.data.error.messages)
    //       } else {
    //         commit('SET_user_ERROR', ['Une erreur est survenue'])
    //       }
    //       return false
    //     }
    //     return true
    //   },
    //   async updateuser({ commit }, { body, user }) {
    //     commit('SET_user_LOADING', true)
    //     commit('SET_user_ERROR')
    //     const payload = {
    //       designation: body.name,
    //       detail: body.detail,
    //       start_date: body.start,
    //       end_date: body.end,
    //       projet_id: body.projet_id
    //     }
    //     if (body.type) {
    //       payload.type_user_id =
    //         body.type && body.type.id ? body.type.id : body.type
    //     }
    //     if (body.fieldsUpdate && body.fieldsUpdate.length) {
    //       payload.fields = body.fieldsUpdate
    //     }
    //     if (body.start_time) {
    //       payload.start_time = body.start_time
    //     }
    //     if (body.end_time) {
    //       payload.end_time = body.end_time
    //     }
    //     try {
    //       const response = await axios.put(
    //         domain + '/api/users/' + user.id,
    //         payload,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${this.state.currentUser.token}`
    //           }
    //         }
    //       )
    //       commit('UPDATE_user', {
    //         user,
    //         data: response.data.data
    //       })
    //       commit('SET_user_LOADING')
    //     } catch (error) {
    //       commit('SET_user_LOADING')
    //       if (
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.error &&
    //         error.response.data.error.messages
    //       ) {
    //         commit('SET_user_ERROR', error.response.data.error.messages)
    //       } else {
    //         commit('SET_user_ERROR', ['Une erreur est survenue'])
    //       }
    //       return false
    //     }
    //     return true
    //   },
    //   async deleteduser({ commit }, id) {
    //     commit('SET_user_LOADING', true)
    //     commit('SET_user_ERROR')
    //     try {
    //       await axios.delete(domain + '/api/users/' + id, {
    //         headers: {
    //           Authorization: `Bearer ${this.state.currentUser.token}`
    //         }
    //       })
    //       commit('REMOVE_user', id)
    //       commit('SET_user_LOADING')
    //     } catch (error) {
    //       commit('SET_user_LOADING')
    //       if (
    //         error.response &&
    //         error.response.data &&
    //         error.response.data.error &&
    //         error.response.data.error.messages
    //       ) {
    //         commit('SET_user_ERROR', error.response.data.error.messages)
    //       } else {
    //         commit('SET_user_ERROR', ['Une erreur est survenue'])
    //       }
    //       return false
    //     }
    //     return true
    //   },
    //   resetErroruser({ commit }) {
    //     commit('SET_user_ERROR')
    //   }
}
export default {
    state,
    getters,
    mutations,
    actions
}