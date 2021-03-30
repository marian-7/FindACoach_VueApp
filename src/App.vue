<template>
  <the-header></the-header>
  <main>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('coaches');
      }
    }
  },
  created() {
    this.$store.dispatch('tryLogin');
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #6b5b95;
}

html {
  font-family: 'Poppins', sans-serif;
}

body {
  width: 100%;
  background: linear-gradient(90deg, #fff, #a2b9bc);
}

main {
  width: 100%;
  padding-top: 4rem;
  max-width: 900px;
  min-height: 100vh;
  margin: 0 auto;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.route-enter-active {
  transition: all 0.2s ease-out;
}
.route-leave-active {
  transition: all 0.2s ease-in;
}

@keyframes disappear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drop {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes drop {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>