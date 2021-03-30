import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Marian',
          lastName: 'Babic',
          areas: ['backend', 'frontend', 'career'],
          description:
            'Highly skilled software engineer, loves football and Apple.',
          hourlyRate: 90
        },
        {
          id: 'c2',
          firstName: 'Matija',
          lastName: 'Osrecki',
          areas: ['frontend'],
          description: 'Design is in my blood. CSS is a powerful tool. Crypto is my baby.',
          hourlyRate: 70
        },
        {
          id: 'c3',
          firstName: 'Laura',
          lastName: 'Planinic',
          areas: ['career'],
          description:
            "New employee at Zero Molecule. I'm lazy and live with family.",
          hourlyRate: 40
        },
        {
          id: 'c4',
          firstName: 'Lorena',
          lastName: 'Planinic',
          areas: ['frontend'],
          description:
            "Learning HTML and CSS for 3 years now. Social worker and personal trainer.",
          hourlyRate: 40
        },
      ]
    };
  },
  getters,
  mutations,
  actions
};
