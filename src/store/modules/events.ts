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
        state.events = state.events.filter(event => event.id !== id)
    },
    SET_EVENT(state, payload = null) {
        state.event = payload

    },
    ADD_EVENT(state, payload) {
        state.events.push(payload)
    },
    UPDATE_EVENT(state, { event, data }) {
        event.updateEvent(data)
    },
}
const actions = {
    async updateEvent({ commit }, { body, event }) {
        commit('SET_EVENTS_LOADING', true)
        commit('SET_EVENTS_ERROR')
        try {


                commit('UPDATE_EVENT', {
                    event,
                    data: decodeApiToEvent(body)
                })
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
            console.log(response.data.data.map(decodeApiToEvent))
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
    async deleteEvent({ commit }, id) {
        commit('SET_EVENTS_LOADING', true)
        commit('SET_EVENTS_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.DELETE,
                `${endPoints.findEvent}/${id}`,
                undefined,
                undefined
            );
            console.log('dfg',response)
            if (response.success) {

                commit('REMOVE_EVENT', id)
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
