<template>
  <base-card>
    <h2>Contact Coach</h2>
    <form @submit.prevent="sendMessage">
      <div class="form-controls" :class="{ invalid: !email.isValid }">
        <label for="email">Your Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          v-model.trim="email.val"
          @input="validate"
        />
        <p class="invalid" v-if="!email.isValid">Enter valid email address!</p>
      </div>
      <div class="form-controls" :class="{ invalid: !message.isValid }">
        <label for="message">Your Message</label>
        <textarea
          type="text"
          placeholder="Enter your message here..."
          id="message"
          v-model.trim="message.val"
          rows="5"
          @input="validate"
        ></textarea>
        <p class="invalid" v-if="!message.isValid">Message is required!</p>
      </div>
      <div class="actions">
        <transition name="sentRequest" mode="out-in">
          <base-button mode="filled" v-if="!formSent">Send</base-button>
          <p v-else class="success">Requests is sent. Redirecting to homepage...</p>
        </transition>
      </div>
    </form>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formSent: false,
      firstTime: true,
    };
  },
  methods: {
    validate() {
      if (this.firstTime) {
        return;
      }
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
      } else {
        this.email.isValid = true;
      }
      if (this.message.val === '') {
        this.message.isValid = false;
      } else {
        this.message.isValid = true;
      }
    },
    sendMessage() {
      this.firstTime = false;
      this.validate();

      if (!this.isMessageValid) {
        return;
      }

      const request = {
        coachId: this.$route.params.id,
        email: this.email.val,
        message: this.message.val,
      };
      this.formSent = true;
      this.$store.dispatch('requests/contactCoach', request);
      setTimeout(() => {
        this.$router.replace('/coaches');
      }, 2000);
    },
  },
  computed: {
    isMessageValid() {
      if (this.email.val === '' || this.message.val === '') {
        return false;
      }
      return true;
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
  width: 6rem;
}

.invalid label,
.invalid p {
  color: rgb(255, 0, 0, 0.6);
}

.invalid p {
  font-size: 0.8rem;
}

.invalid input,
.invalid textarea {
  border-color: rgb(255, 0, 0, 0.6);
}

.success p {
  color: rgb(0, 212, 0, 0.7);
}

.sentRequest-enter-active {
  animation: slide 0.3s ease-out;
}
.sentRequest-leave-active {
  animation: slide 0.3s ease-in reverse;
}
</style>
