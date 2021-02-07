export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    // state.tokenExpiration = payload.tokenExpiration; // just in localStorage
    state.didAutoLogout = false; // reset didAutoLogout state to origin: false
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
