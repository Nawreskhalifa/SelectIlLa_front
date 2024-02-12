import { decodeApiToEventCategory } from '@/models/EventCategory/EventCategory'
import { makeApiRequest } from '@/services/apiService'
import { endPoints } from '@/utils/endPoints'
import { methodsHttpNames } from '@/utils/methods'

const state = {
    categoriesError: null,
    categoriesLoading: false,
    categoriesEvent: [],
    categoryEvent: null,
    totalPages: 1,
    totalItems: 0,
}
const getters = {
    getCategoriesError: state => state.categoriesError,
    getCategoriesLoading: state => state.categoriesLoading,
    getCategoriesEvent: state => state.categoriesEvent,
    getCategoryEvent: state => state.categoryEvent,
    getTotalPages: state => state.totalPages,
    getTotalItems: (state) => state.totalItems,


}
const mutations = {
    SET_TOTAL_ITEMS(state, payload = 0) {
        state.totalItems = payload;
    },
    SET_TOTAL_PAGES(state, payload = 1) {
        state.totalPages = payload
    },
    SET_CATEGORIES_LOADING(state, payload = false) {
        state.categoriesLoading = payload
    },
    SET_CATEGORIES_ERROR(state, payload = null) {
        state.categoriesError = payload
    },
    SET_CATEGORIES(state, payload) {
        state.categoriesEvent = payload
    },
    REMOVE_CATEGORY(state, id) {
        state.categoriesEvent = state.categoriesEvent.filter(category => category.id != id)
    },
    SET_CATEGORY_EVENT(state, payload = null) {
        state.categoryEvent = payload

    },
    ADD_CATEGORY(state, payload) {
        state.categoriesEvent.push(payload)
    },
    UPDATE_CATEGORY(state, { category, data }) {
        category.updateCategory(data)
    },
}
const actions = {
    async updateCategory({ commit }, { body, category }) {
        commit('SET_CATEGORIES_LOADING', true)
        commit('SET_CATEGORIES_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.PUT,
                `${endPoints.deleteCategoryEvent}/${category.id}`,
                {
                    data: {
                        name: body.name,
                        description: body.description,
                    }
                },
                undefined
            );
            console.log(response.data.data)
            if (response.success) {

                commit('UPDATE_CATEGORY', {
                    category,
                    data: decodeApiToEventCategory(response.data.data)
                })
                commit('SET_CATEGORIES_LOADING')
            }

        } catch (error: any) {
            commit('SET_CATEGORIES_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_CATEGORIES_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_CATEGORIES_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async fetchAllCategoriesEvent({ commit }, { page = null, perPage = 25, name = null }: { page?: number | null, perPage?: number, name: string | null }) {
        commit('SET_CATEGORIES_LOADING', true)
        commit('SET_CATEGORIES_ERROR')
        try {
            let filters: {
                pagination?: { page: number; pageSize: number };
                filters?: {
                    $or?: Array<{
                        name?: { $contains: string };
                        description?: { $contains: string };
                    }>;
                };
            } = {}
            if (page !== null) {
                filters = { pagination: { page: page, pageSize: perPage } };
            }
            // Add the name filter if specified
            if (name) {
                filters.filters = {
                    ...(filters.filters || {}), $or: [
                        { name: { $contains: name } },
                        { description: { $contains: name } },
                    ]
                };
            }
            const params: any = {};

            // Ajouter la pagination si spécifiée
            if (page && perPage) {
                params.pagination = {
                    page: page,
                    pageSize: perPage
                };
            }

            // Ajouter la recherche (filtre par nom) si spécifiée
            if (name) {
                params.filters = {
                    name: {
                        $contains: name
                    }
                };
            }


            const response = await makeApiRequest(
                methodsHttpNames.GET,
                endPoints.allCategoriesEvent,
                undefined,
                filters
            );
            console.log(response.data.data)
            if (response.success) {
                console.log("dd", response.data.meta.pagination);
                commit("SET_TOTAL_PAGES", response.data.meta.pagination.pageCount);
                commit("SET_TOTAL_ITEMS", response.data.meta.pagination.total);
                commit('SET_CATEGORIES', response.data.data.map(decodeApiToEventCategory))
                commit('SET_CATEGORIES_LOADING')

            }

        } catch (error: any) {
            commit('SET_CATEGORIES_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_CATEGORIES_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_CATEGORIES_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async deleteCategoryEvent({ commit }, id) {
        commit('SET_CATEGORIES_LOADING', true)
        commit('SET_CATEGORIES_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.DELETE,
                `${endPoints.deleteCategoryEvent}/${id}`,
                undefined,
                undefined
            );
            if (response.success) {

                commit('REMOVE_CATEGORY', id)
                commit('SET_CATEGORIES_LOADING')
            }

        } catch (error: any) {
            commit('SET_CATEGORIES_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_CATEGORIES_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_CATEGORIES_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async fetchOneCategoryEvent({ commit }, idCategory) {
        commit('SET_CATEGORIES_LOADING', true)
        commit('SET_CATEGORIES_ERROR')
        try {
            const response = await makeApiRequest(
                methodsHttpNames.GET,
                `${endPoints.detailCategoryEvent}/${idCategory}`,
                undefined,
                undefined
            );
            commit('SET_CATEGORY_EVENT', decodeApiToEventCategory(response.data.data))
            commit('SET_CATEGORIES_LOADING')
        } catch (error: any) {
            commit('SET_CATEGORIES_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_CATEGORIES_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_CATEGORIES_ERROR', ['Une erreur est survenue'])
            }
            return false
        }
        return true
    },
    async addCategory({ commit }, payload) {
        commit('SET_CATEGORIES_LOADING', true)
        commit('SET_CATEGORIES_ERROR')
        try {
            console.log(payload)
            const response = await makeApiRequest(
                methodsHttpNames.POST,
                endPoints.createCategoryEvent,
                {
                    data: {
                        name: payload.name,
                        description: payload.description,
                    }
                },
                undefined
            );
            commit('ADD_CATEGORY', decodeApiToEventCategory(response.data.data))
            commit('SET_CATEGORIES_LOADING')
        } catch (error: any) {
            commit('SET_CATEGORIES_LOADING')
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.messages
            ) {
                commit('SET_CATEGORIES_ERROR', error.response.data.error.messages)
            } else {
                commit('SET_CATEGORIES_ERROR', ['Une erreur est survenue'])
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