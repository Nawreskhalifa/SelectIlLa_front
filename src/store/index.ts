import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'
import users from './modules/users'
import eventCategories from './modules/eventCategories'
import events from './modules/events'
import partner from './modules/Partner'

export default createStore(Vuex.Store, {
    modules: {
        users,
        eventCategories,
        partner,
        events
    }
})
