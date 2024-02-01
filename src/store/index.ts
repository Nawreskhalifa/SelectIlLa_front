import Vuex from 'vuex'
import { createStore } from 'vuex-extensions'
import users from './modules/users'

export default createStore(Vuex.Store, {
    modules: {
        users
    }
})
