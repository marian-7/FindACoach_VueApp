<template>
  <base-card>
    <h2>Register as a new Coach!</h2>
    <coach-form @save-coach="saveCoach"></coach-form>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm
  },
  methods: {
    saveCoach(coachData) {
      this.$store.dispatch('coaches/registerCoach', coachData);
      this.$router.replace('/coaches');
    }
  }
}
</script>