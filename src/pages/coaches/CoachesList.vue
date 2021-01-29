<template>
  <section>
    <h2>Filter</h2>
  </section>
  <section>
    <div class="d-flex justify-content-around">
      <button class="btn btn-success">Refresh</button>
      <router-link to="/register" class="btn btn-success"
        >Register a coach</router-link
      >
    </div>
    <h2>List</h2>
    <ul v-if="hasCoaches">
      <li v-for="coach in filteredCoaches" :key="coach.id">
        {{ coach.firstName }}
      </li>
    </ul>
    <h3 v-else>No coaches</h3>
  </section>
</template>

<script>
export default {
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

<style></style>
