<template>
  <section class="list-section container bg-light">
    <h2 class="text-center mb-4">Requests Received</h2>

    <div v-show="error" class="container mb-3 error">
      {{ error }}
    </div>

    <div v-if="isLoading">
      <Loading />
    </div>

    <ul v-else-if="hasRequests && !isLoading" class="container">
      <RequestItem
        v-for="request in receivedRequests"
        :key="request.id"
        :email="request.userEmail"
        :message="request.message"
      />
    </ul>

    <h3 v-else>You haven't received any requests yet!</h3>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
import Loading from "../../components/ui/Loading.vue";

export default {
  components: {
    RequestItem,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (err) {
        this.error = err.message || "Something went wrong";
      }

      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.list-section {
  margin: 1.5rem auto;
  padding: 1.5rem;
  border: 2px solid #a5a58d;
  border-radius: 10px;
}
.error {
  background-color: pink;
  color: red;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 1rem;
  width: 50%;
}
</style>
