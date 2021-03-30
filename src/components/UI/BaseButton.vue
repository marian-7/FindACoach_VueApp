<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link :to="to" :class="mode" v-else>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      dafault: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    },
    mode: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style scoped>
button, a {
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  background-color: transparent;
  border-radius: 15px;
  border: 2px solid #6b5b95;
  color: #6b5b95;
  transition: all 0.3s ease;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  outline: none;
}

button:hover, a:hover {
  color: #fff;
  background-color: #6b5b95;
  cursor: pointer;
}

.filled {
  color: #fff;
  background-color: #6b5b95;
}

.filled:hover {
  box-shadow: 0 0 10px #6b5b95;
  cursor: pointer;
}
</style>