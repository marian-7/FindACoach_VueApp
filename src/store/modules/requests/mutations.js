export default {
  addRequest(state, req) {
    state.requests.push(req);
  },
  setRequests(state, payload) {
    state.requests = payload;
  }
};