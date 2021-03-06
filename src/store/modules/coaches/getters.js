export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  coachById: (state) => (id) => {
    return state.coaches.find(co => co.id === id);
  },
  isCoach(_, getters, _2, rootGetters) {
    return getters.coaches.some(coach => coach.id === rootGetters.userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};