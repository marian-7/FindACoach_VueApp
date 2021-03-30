<template>
  <base-card>
    <h2>Filter</h2>
    <span class="check-option">
      <input type="checkbox" id="frontend" checked @change="setFilters">
      <label for="frontend">Frontend</label>
    </span>
    <span class="check-option">
      <input type="checkbox" id="backend" checked @change="setFilters">
      <label for="backend">Backend</label>
    </span>
    <span class="check-option">
      <input type="checkbox" id="career" checked @change="setFilters">
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emit: ['change-filters'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  methods: {
    setFilters(event) {
      const inputId = event.target.id;
      const inputState = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: inputState
      };
      this.filters = updatedFilters;
      this.$emit('change-filters', updatedFilters);
    }
  }
}
</script>

<style scoped>
.check-option {
  margin: 0.5rem;
}

.check-option label {
  margin-left: 0.3rem;
}
</style>