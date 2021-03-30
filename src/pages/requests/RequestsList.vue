<template>
<div>
  <base-dialog :show="!!error" title="Error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <header>
      <h2>Requests</h2>
    </header>
    <div class="div-center">
      <base-loader v-if="isLoading"></base-loader>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="req in recivedRequests"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You don't have any requests yet!</h3>
    </div>
  </base-card>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseDialog from '../../components/UI/BaseDialog.vue';

export default {
  components: {
    RequestItem,
  },
  data() {
    BaseDialog;
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    recivedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
  }
};
</script>

<style scoped>
.div-center {
  width: 100%;
  display: flex;
  justify-content: center;
}
.div-center h3 {
  margin-top: 1rem;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.div-center ul {
  width: 100%;
}
</style>