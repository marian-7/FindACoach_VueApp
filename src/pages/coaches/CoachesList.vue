<template>
  <div>
    <base-dialog :show="!!error" title="Error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filters="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)">Refresh</base-button>
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <h1>Coaches</h1>
        <div class="loader" v-if="isLoading">
          <base-loader></base-loader>
        </div>
        <ul v-if="hasCoaches">
          <transition-group tag="ul" name="coaches">
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :areas="coach.areas"
              :description="coach.description"
              :rate="coach.hourlyRate"
            ></coach-item>
          </transition-group>
        </ul>
        <h3 v-if="!hasCoaches && !isLoading">There are no coaches.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
    BaseDialog,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((co) => {
        if (this.filters.frontend && co.areas.includes('frontend')) {
          return true;
        }
        if (this.filters.backend && co.areas.includes('backend')) {
          return true;
        }
        if (this.filters.career && co.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  methods: {
    refresh() {
      console.log(this.$route);
    },
    setFilters(updatedFilters) {
      this.filters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
.coaches-enter-active {
  animation: disappear 0.3s ease-out;
}
.coaches-leave-active {
  position: absolute;
  animation: disappear 0.3s ease-in reverse;
}

.coaches-move {
  transition: transform 0.3s ease;
}

ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}

ul .base-card {
  width: 48%;
  margin: 0.5rem 0;
  height: auto;
}

.controls {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  width: 100%;
  min-height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 800px) {
  ul .base-card {
    width: 100%;
  }
}
</style>
