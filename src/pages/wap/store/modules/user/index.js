const state = {
  userName: "",
};
const mutations = {
  setUserName: (state, data) => {
    state.userName = data;
  },
};
const actions = {
  getUserName: ({ dispatch, commit, state }) => {
    commit("setUserName", "");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
