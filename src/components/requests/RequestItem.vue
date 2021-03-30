<template>
  <base-card>
    <header>
      <a :href="emailTo">{{ email }}</a>
    </header>
    <section class="message">
      <p>{{ message }}</p>
    </section>
  </base-card>
</template>

<script>
export default {
  props: ['email', 'message'],
  computed: {
    emailTo() {
      return 'mailto:' + this.email;
    }
  }
}
</script>

<style scoped>
.base-card {
  width: 100%;
  padding: 0;
}

.base-card header {
  width: 100%;
  padding: 0.8rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #6b5b95;
}

.base-card header a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

.base-card header a:hover {
  text-shadow: 0 0 15px #ccc;
  color: rgb(254, 178, 54, 0.6);
}

.base-card .message {
  padding: 0.8rem;
  width: 100%;
}
</style>