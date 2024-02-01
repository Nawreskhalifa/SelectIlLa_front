import { decodeUsers } from '@/models/User/User'
import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'
import { decodeCustomers } from '@/models/Customer/Customer'
import { decodePartners } from '@/models/Partner/Partner'

const state = {
    userError: null,
    userLoading: false,
    users: [],
    customers: [],
    partners: [],
}
const getters = {
    getUsersError: state => state.userError,
    getUsersLoading: state => state.userLoading,
    getUsers: state => state.users,
    getCustomers: state => state.customers,
    getPartners: state => state.partners,
}
const mutations = {
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
    SET_PARTNERS(state, payload) {
        state.partners = payload
    },
    REMOVE_CUSTOMER(state, id) {
        state.customers = state.customers.filter(customer => customer.id != id)
    }
    //   ADD_user(state, payload) {
    //     state.userOfProject.push(user.create(payload))
    //   },
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
    async fetchAllCustomers({ commit }) {
        commit('SET_USERS_LOADING', true)
        commit('SET_USERS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allCustomers,
                undefined,
                undefined
            );
            if (response.success) {
                commit('SET_CUSTOMERS', decodeCustomers(response.data))
                commit('SET_USERS_LOADING')
                console.log(decodeCustomers(response.data))

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
            if (response.success) {
                commit('SET_PARTNERS', decodePartners(response.data))
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
        commit('SET_USER_LOADING', true)
        commit('SET_USER_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.DELETE,
                `${endPoints.deleteCustomer}/${id}`,
                undefined,
                undefined
            );
            if (response.success) {

                commit('REMOVE_CUSTOMER', id)
                commit('SET_USER_LOADING')
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
