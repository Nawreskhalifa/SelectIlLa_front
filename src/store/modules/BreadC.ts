
const state ={
 openedPage : String,
}
const getters={
    getOpenedPageName: (state) => state.openedPage
}
const mutations={
    ChangeOpenedPageName : (state, payload ) => {
       state.openedPage = payload
    }
}

const actions ={

}
export default {
  state,
  getters,
  mutations,
  actions,
};