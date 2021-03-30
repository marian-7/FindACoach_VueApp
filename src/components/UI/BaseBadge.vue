<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<style scoped>
.badge {
  font-size: 12px;
  font-weight: 550;
  padding: 0.2rem 0.7rem;
  border-radius: 30px;
  border: 1px solid #ccc;
  margin: 0 5px;
  display: inline-block;
  color: #fff;
}

.backend {
  background-color: rgb(178, 173, 127, 0.15);
  color: #b2ad7f;
}

.frontend {
  background-color: rgb(135, 143, 153, 0.15);
  color: #878f99;
}

.career {
  background-color: rgb(255, 153, 102, 0.15);
  color: rgb(255, 153, 102);
}
</style>