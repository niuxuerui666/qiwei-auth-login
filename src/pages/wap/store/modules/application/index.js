const state = {
    application: "",
  };
  const mutations = {
    setApplication: (state, data) => {
      state.application = data;
    },
  };
  const actions = {
    Application: ({ dispatch, commit, state }) => {
      commit("setToken", "");
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  