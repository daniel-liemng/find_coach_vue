<template>
  <section class="list-section container bg-light">
    <h2 class="text-center mb-4">Requests Received</h2>
    <ul v-if="hasRequests" class="container">
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

export default {
  components: {
    RequestItem,
  },
  computed: {
    receivedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
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
</style>
