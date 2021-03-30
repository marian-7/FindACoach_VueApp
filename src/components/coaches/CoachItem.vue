<template>
  <base-card>
    <div>
      <header>
        <h3>{{ fullName }}</h3>
        <h4>
          <strong>{{ rate }}</strong
          >$/hour
        </h4>
      </header>
      <hr />
      <div class="desc">
        <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
        <p>{{ description }}</p>
      </div>
      <div class="actions">
        <base-button link :to="viewDetailsLink">View Details</base-button>
        <base-button link mode="filled" :to="contactCoachLink">Contact</base-button>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'areas', 'rate', 'description'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    viewDetailsLink() {
      const path = this.$route.fullPath + '/' + this.id;
      return path;
    },
    contactCoachLink() {
      const path = this.$route.fullPath + '/' + this.id + '/contact';
      return path;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions {
  padding-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.desc {
  min-height: 8rem;
}

hr {
  margin: 0.5rem 0;
}

div p {
  margin: 0.5rem 0;
}
</style>