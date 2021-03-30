export default {
  saveCoach(state, coach) {
    state.coaches.push(coach);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};