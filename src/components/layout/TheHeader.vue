<template>
  <header>
    <div class="logo-box">
      <h1><i class="fas fa-running"></i> FindACoach</h1>
    </div>
    <nav>
      <ul>
        <li>
          <base-button link to="/coaches">Coaches</base-button>
        </li>
        <li v-if="isLoggedIn">
          <base-button link to="/requests">Requests</base-button>
        </li>
        <li v-else>
          <base-button link to="/auth">Login</base-button>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
        <li class="icon">
          <a href="#" @click="toggleMenu">
            <i class="fas fa-bars"></i>
          </a>
          <transition name="dropdown-an">
            <div class="dropdown" v-if="dropdown" @click="toggleMenu">
              <base-button link to="/coaches">Coaches</base-button>
              <base-button v-if="isLoggedIn" link to="/requests"
                >Requests</base-button
              >
              <base-button v-else link to="/auth">Login</base-button>
              <base-button v-if="isLoggedIn" @click="logout"
                >Logout</base-button
              >
            </div>
          </transition>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      dropdown: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
    toggleMenu() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>

<style scoped>
header {
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
}

nav {
  width: 25%;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

nav ul li {
  padding: 0;
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
}

nav ul li a,
nav ul li button {
  padding: 0.5rem 1rem;
}

a.router-link-active {
  border: 2px solid #6b5b95;
  background-color: rgb(107, 91, 149, 0.7);
  color: white;
}

.logo-box {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-box h1 {
  margin-left: 0.5rem;
  color: #000;
}

.logo {
  height: 100%;
}

.icon {
  display: none;
}
.dropdown {
  position: absolute;
  left: 0;
  top: 70px;
  width: 100%;
  background-color: #fff;
}

.dropdown a,
.dropdown button {
  width: 100%;
  height: 100%;
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  color: #fff;
  background-color: rgb(97, 74, 155);
  border: 1px solid #6b5b95;
  margin: 0;
}

.dropdown-an-enter-active {
  animation: 0.3s drop ease-out;
}

.dropdown-an-leave-active {
  animation: 0.3s drop ease-in reverse;
}

@media (max-width: 1300px) {
  nav {
    width: 40%;
  }
}
@media (max-width: 900px) {
  nav {
    width: 50%;
  }
}
@media (max-width: 800px) {
  nav li:not(:last-child) {
    display: none;
  }
  .icon {
    display: flex;
    height: 3rem;
    width: 3rem;
  }

  .icon a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
  }
}
</style>
