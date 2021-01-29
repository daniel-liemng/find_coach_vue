<template>
  <section>
    <h2>Filter</h2>
  </section>
  <section class="list-section container bg-light">
    <div class="d-flex justify-content-around mb-5">
      <button class="btn btn-success">Refresh</button>
      <router-link to="/register" class="btn btn-success"
        >Register a coach</router-link
      >
    </div>

    <ul v-if="hasCoaches" class="container">
      <CoachItem
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :hourlyRate="coach.hourlyRate"
        :areas="coach.areas"
      />
    </ul>
    <h3 v-else>No coaches</h3>
  </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
  components: {
    CoachItem,
  },
  computed: {
    filteredCoaches() {
      // coaches: 1st is namespace in store, 2nd is the getters name
      return this.$store.getters["coaches/coaches"];
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
};
</script>

<style scoped>
.list-section {
  margin: 0 auto;
  padding: 1.5rem;
  border: 2px solid #a5a58d;
  border-radius: 10px;
}
</style>
