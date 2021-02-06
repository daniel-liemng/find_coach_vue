export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  // isCoach(state, getters, rootState, rootGetters)
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  // cache
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      // should update if no timestamp
      return true;
    }

    // update every a minute
    const currentTimestamp = new Date().getTime();

    // should update if true
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
