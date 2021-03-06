<template>
  <div>
    <section>
      <CoachFilter @change-filter="setFilters" />
    </section>
    <section class="list-section container bg-light">
      <div class="d-flex mb-3">
        <button class="btn btn-success" @click="loadCoaches(true)">
          Refresh
        </button>

        <div class="m-1"></div>

        <router-link
          v-if="!isLoggedIn"
          to="/auth?redirect=register"
          class="btn btn-success"
          >Login to Register as a Coach</router-link
        >

        <router-link
          v-if="isLoggedIn && !isCoach && !isLoading"
          to="/register"
          class="btn btn-success"
          >Register as a Coach</router-link
        >
      </div>

      <div v-show="error" class="container mb-3 error">
        {{ error }}
      </div>

      <div v-if="isLoading">
        <Loading />
      </div>

      <ul v-else-if="hasCoaches && !isLoading" class="container">
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
  </div>
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
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      // auth has no namespace -> access getters directly
      return this.$store.getters.isAuthenticated;
    },
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
    // refresh for no cache
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      this.error = null;

      try {
        // payload: forceRefresh for Refresh Btn
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      }

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

.error {
  background-color: pink;
  color: red;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 1rem;
  width: 50%;
}
</style>
