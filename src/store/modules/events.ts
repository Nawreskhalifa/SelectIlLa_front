import { decodeApiToEvent } from '@/models/Event/Event'
import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'

const state = {
    eventsError: null,
    eventsLoading: false,
    events: [],
    event: null
}
const getters = {
    getEventsError: state => state.eventsError,
    getEventsLoading: state => state.eventsLoading,
    getEvents: state => state.events,
    getEvent: state => state.event,
}
const mutations = {
    SET_EVENTS_LOADING(state, payload = false) {
        state.eventsLoading = payload
    },
    SET_EVENTS_ERROR(state, payload = null) {
        state.eventsError = payload
    },
    SET_EVENTS(state, payload) {
        state.events = payload
    },
    REMOVE_EVENT(state, id) {
        state.events = state.events.filter(event => event.id != id)
    },
    SET_EVENT(state, payload = null) {
        state.event = payload

    },
    ADD_EVENT(state, payload) {
        state.events.push(payload)
    },
    UPDATE_EVENT(state, { category, data }) {
        category.updateEvent(data)
    },
}
const actions = {
    // async updateCategory({ commit }, { body, category }) {
    //     commit('SET_EVENTS_LOADING', true)
    //     commit('SET_EVENTS_ERROR')
    //     try {
    //         const response = await makeApiRequest(
    //             methodsHttpNames.PUT,
    //             `${endPoints.deleteevent}/${category.id}`,
    //             {
    //                 data: {
    //                     name: body.name,
    //                     description: body.description,
    //                 }
    //             },
    //             undefined
    //         );
    //         console.log(response.data.data)
    //         if (response.success) {

    //             commit('UPDATE_CATEGORY', {
    //                 category,
    //                 data: decodeApiToEventCategory(response.data.data)
    //             })
    //             commit('SET_EVENTS_LOADING')
    //         }

    //     } catch (error: any) {
    //         commit('SET_EVENTS_LOADING')
    //         if (
    //             error.response &&
    //             error.response.data &&
    //             error.response.data.error &&
    //             error.response.data.error.messages
    //         ) {
    //             commit('SET_EVENTS_ERROR', error.response.data.error.messages)
    //         } else {
    //             commit('SET_EVENTS_ERROR', ['Une erreur est survenue'])
    //         }
    //         return false
    //     }
    //     return true
    // },
    async fetchAllEvents({ commit }) {
        commit('SET_EVENTS_LOADING', true)
        commit('SET_EVENTS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allEvents,
                undefined,
                undefined
            );
            if (response.success) {
                commit('SET_EVENTS', response.data.data.map(decodeApiToEvent))
                commit('SET_EVENTS_LOADING')

            }

        } catch (error: any) {
            commit('SET_EVENTS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_EVENTS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_EVENTS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    // async deleteevent({ commit }, id) {
    //     commit('SET_EVENTS_LOADING', true)
    //     commit('SET_EVENTS_ERROR')
    //     try {
    //         const response = await makeApiRequest(
    //             methodsHttpNames.DELETE,
    //             `${endPoints.deleteevent}/${id}`,
    //             undefined,
    //             undefined
    //         );
    //         if (response.success) {

    //             commit('REMOVE_CATEGORY', id)
    //             commit('SET_EVENTS_LOADING')
    //         }

    //     } catch (error: any) {
    //         commit('SET_EVENTS_LOADING')
    //         if (
    //             error.response &&
    //             error.response.data &&
    //             error.response.data.error &&
    //             error.response.data.error.messages
    //         ) {
    //             commit('SET_EVENTS_ERROR', error.response.data.error.messages)
    //         } else {
    //             commit('SET_EVENTS_ERROR', ['Une erreur est survenue'])
    //         }
    //         return false
    //     }
    //     return true
    // },
    async fetchOneEvent({ commit }, idCategory) {
        commit('SET_EVENTS_LOADING', true)
        commit('SET_EVENTS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.findEvent}/${idCategory}?populate=*`,
                undefined,
                undefined
            );
            commit('SET_EVENT', decodeApiToEvent(response.data.data))
            commit('SET_EVENTS_LOADING')
        } catch (error: any) {
            commit('SET_EVENTS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_EVENTS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_EVENTS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async addEvent({ commit }, payload) {
        commit('SET_EVENTS_LOADING', true)
        commit('SET_EVENTS_ERROR')
        try {
            console.log(payload)
            // const response = await makeApiRequest(
            //     methodsHttpNames.POST,
            //     endPoints.findEvent,
            //     {
            //         data: {
            //             name: payload.name,
            //             description: payload.description,
            //         }
            //     },
            //     undefined
            // );
            commit('ADD_EVENT', decodeApiToEvent(payload))
            commit('SET_EVENTS_LOADING')
        } catch (error: any) {
            commit('SET_EVENTS_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_EVENTS_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_EVENTS_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
}
export default {
    state,
    getters,
    mutations,
    actions
}
