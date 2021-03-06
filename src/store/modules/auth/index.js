import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state: {
    userId: null,
    token: null,
    // tokenExpiration: null,  // just in localStorage
    didAutoLogout: false,
  },

  mutations,
  actions,
  getters,
};
