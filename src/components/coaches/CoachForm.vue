<template>
  <form @submit.prevent="submitData">
    <div class="form-controls" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstName.val"
        @keyup="validateFirstName"
      />
      <p class="invalid" v-if="!firstName.isValid">
        Please enter your first name!
      </p>
    </div>
    <div class="form-controls" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="lastName.val"
        @keyup="validateLastName"
      />
      <p class="invalid" v-if="!lastName.isValid">
        Please enter your last name!
      </p>
    </div>
    <div class="form-controls" :class="{ invalid: !description.isValid }">
      <label for="description">Short Description<span> (110 characters)</span></label>
      <textarea
        maxlength="110"
        type="text"
        id="description"
        rows="5"
        v-model.trim="description.val"
        @keyup="validateDescription"
      ></textarea>
      <p class="invalid" v-if="!description.isValid">
        Please tell us something about yourself!
      </p>
    </div>
    <div class="form-controls" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="rate.val"
        @keyup="validateRate"
      />
      <p class="invalid" v-if="!rate.isValid">Please set your hourly rate!</p>
    </div>
    <div class="form-controls" :class="{ invalid: !areas.isValid }">
      <h4>Areas of Expertise</h4>
      <div class="areas-option">
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @change="validateAreas"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div class="areas-option">
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @change="validateAreas"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div class="areas-option">
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @change="validateAreas"
        />
        <label for="career">Career</label>
      </div>
      <p class="invalid" v-if="!areas.isValid">
        At least one expertise needs to be selected!
      </p>
    </div>
    <div class="actions">
      <base-button mode="filled">Register</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['save-coach'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      firstSubmit: true,
    };
  },
  computed: {
    validForm() {
      if (this.firstName && this.lastName && this.description && this.rate && this.areas.val.length > 0) {
        return true;
      }
      return false;
    }
  },
  methods: {
    validateAll() {
      this.validateFirstName();
      this.validateLastName();
      this.validateDescription();
      this.validateRate();
      this.validateAreas();
    },
    validateFirstName() {
      if (this.firstName.val === '' && !this.firstSubmit) {
        this.firstName.isValid = false;
        return;
      }
      this.firstName.isValid = true;
    },
    validateLastName() {
      if (this.lastName.val === '' && !this.firstSubmit) {
        this.lastName.isValid = false;
        return;
      }
      this.lastName.isValid = true;
    },
    validateDescription() {
      if (this.description.val === '' && !this.firstSubmit) {
        this.description.isValid = false;
        return;
      }
      this.description.isValid = true;
    },
    validateRate() {
      if (!this.rate.val || (this.rate.val < 0 && !this.firstSubmit)) {
        this.rate.isValid = false;
        return;
      }
      this.rate.isValid = true;
    },
    validateAreas() {
      if (this.areas.val.length === 0 && !this.firstSubmit) {
        this.areas.isValid = false;
        return;
      }
      this.areas.isValid = true;
    },
    submitData() {
      this.firstSubmit = false;
      this.validateAll();

      if (!this.validForm) {
        return;
      }

      const coachData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-coach', coachData);
    },
  },
};
</script>

<style scoped>
.form-controls {
  font: inherit;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.form-controls input,
.form-controls textarea {
  font: inherit;
  padding: 0.3rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  resize: none;
}

.form-controls input:focus,
.form-controls textarea:focus {
  background-color: rgb(162, 185, 188, 0.05);
}

.form-controls label {
  margin-bottom: 0.2rem;
}

.areas-option label {
  margin-left: 0.3rem;
}
.actions {
  width: 100%;
  display: flex;
  justify-content: center;
}

.invalid label,
.invalid h4,
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

.form-controls span {
  font-size: 0.7rem;
}
</style>