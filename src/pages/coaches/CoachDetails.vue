<template>
  <div>
    <base-card>
      <div v-if="coach" class="coach-data">
        <header>
          <h1>{{ fullName }}</h1>
          <h4>
            <strong>{{ coach.hourlyRate }}</strong
            >$/hour
          </h4>
        </header>
        <hr />
        <div>
          <base-badge
            v-for="area in coach.areas"
            :key="area"
            :type="area"
            :title="area"
          ></base-badge>
        </div>
        <div class="description">
          <h4>Description:</h4>
          <p>{{ coach.description }}</p>
        </div>
        <div class="actions">
          <router-link :to="contactLink">Contact</router-link>
        </div>
      </div>
      <h2 v-else>Coach with that ID does not exist!</h2>
    </base-card>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      contactActive: false,
    };
  },
  computed: {
    coach() {
      return this.$store.getters['coaches/coachById'](this.id);
    },
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    contactLink() {
      const path = this.$route.fullPath;
      if (path.includes('contact')) {
        return path;
      }
      return path + '/contact';
    },
  },
};
</script>

<style scoped>
hr {
  margin: 0.5rem 0;
}

.coach-data header {
  display: flex;
  justify-content: space-between;
}

.description {
  margin: 0.5rem 0;
}

.description p {
  margin: 0.2rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions a {
  outline: none;
  font-size: 15px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background-color: #6b5b95;
  border-radius: 15px;
  border: 2px solid #6b5b95;
  color: #fff;
  transition: all 0.3s ease;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
}

.actions a:hover {
  background-color: transparent;
  color: #6b5b95;
  cursor: pointer;
}
</style>