<template>
  <section>
    <CoachFilter @change-filter="setFilters" />
  </section>
  <section class="list-section container bg-light">
    <div class="d-flex justify-content-around mb-5">
      <button class="btn btn-success" @click="loadCoaches">Refresh</button>
      <router-link
        v-if="!isCoach && !isLoading"
        to="/register"
        class="btn btn-success"
        >Register a coach</router-link
      >
    </div>

    <div v-if="isLoading">
      <Loading />
    </div>

    <ul v-else-if="hasCoaches" class="container">
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
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import Loading from "../../components/ui/Loading.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
    Loading,
  },
  data() {
    return {
      isLoading: false,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    filteredCoaches() {
      // coaches: 1st is namespace in store, 2nd is the getters name
      // return this.$store.getters["coaches/coaches"];
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;

      await this.$store.dispatch("coaches/loadCoaches");

      this.isLoading = false;
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
