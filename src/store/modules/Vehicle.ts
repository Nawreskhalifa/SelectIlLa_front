const state = {
  selectedItems: [],
};

const mutations = {
  SET_SELECTED_ITEMS(state, items) {
    state.selectedItems = items;
  },
};

const actions = {
  selectItem({ commit, state }, item) {
    const selectedItems = [...state.selectedItems, item];
    commit("SET_SELECTED_ITEMS", selectedItems);
  },
  deselectItem({ commit, state }, item) {
    const selectedItems = state.selectedItems.filter((selected) => selected.id !== item.id);
    commit("SET_SELECTED_ITEMS", selectedItems);
  },
};

const getters = {
  selectedItems: (state) => state.selectedItems,
};

export default {
  state,
  mutations,
  actions,
  getters,
};