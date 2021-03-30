<template>
  <div>
    <base-dialog :show="!!error" title="Error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <p>Authenticating...</p>
      <base-loader></base-loader>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <transition name="mode-switch" mode="out-in">
          <div class="login" v-if="pageInd">
            <h2>Login page</h2>
            <div class="form-controls">
              <label for="email">Email</label>
              <input type="email" id="email" v-model.trim="email" />
            </div>
            <div class="form-controls">
              <label for="password">Password</label>
              <input type="password" id="password" v-model.trim="password" />
            </div>
            <p class="invalid" v-if="!formIsValid">
              Please enter a valid email and password (must be at least 6
              characters long).
            </p>
          </div>
          <div class="signup" v-else>
            <h2>Signup page</h2>
            <div class="form-controls">
              <label for="email">Email</label>
              <input type="email" id="email" v-model.trim="email" />
            </div>
            <div class="form-controls">
              <label for="password">Password</label>
              <input type="password" id="password" v-model.trim="password" />
            </div>
            <p class="invalid" v-if="!formIsValid">
              Please enter a valid email and password (must be at least 6
              characters long).
            </p>
          </div>
        </transition>
        <div class="actions">
          <base-button mode="filled">{{ submitButtonCaption }}</base-button>
          <base-button type="button" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseLoader from '../../components/UI/BaseLoader.vue';
export default {
  components: { BaseLoader },
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
    pageInd() {
      return this.mode === 'login';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (!this.validateEmail() || !this.validatePassword()) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        this.$router.replace('/coaches');
      } catch (err) {
        this.error = err.message || 'Failed to authenticate, try later.';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
      this.formIsValid = true;
      this.email = '';
      this.password = '';
    },
    validateEmail() {
      const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      return regex.test(this.email);
    },
    validatePassword() {
      if (!this.password || this.password.length < 6) {
        return false;
      }
      return true;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>


<style scoped>
.form-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
}

.form-controls input,
.form-controls textarea {
  font: inherit;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
}

.actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.actions button {
  width: 9rem;
}

.invalid {
  font-size: 0.8rem;
  color: rgb(255, 0, 0, 0.6);
}

.sentRequest-enter-active {
  animation: slide 0.3s ease-out;
}
.sentRequest-leave-active {
  animation: slide 0.3s ease-in reverse;
}

.mode-switch-enter-active {
  animation: slide 0.3s ease-out;
}
.mode-switch-leave-active {
  animation: slide 0.3s ease-in reverse;
}

</style>
