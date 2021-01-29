<template>
  <div class="card container mt-5">
    <div class="row g-0">
      <div class="col-md-3 d-flex align-items-center">
        <div class="card-body">
          <h3 class="card-title">{{ fullName }}</h3>
          <p class="card-text">${{ rate }}/hour</p>
        </div>
      </div>
      <div class="col-md-9 p-3">
        <div class="card-body">
          <div class="areas">
            <span
              v-for="(area, index) in areas"
              :key="index"
              class="area fw-bold"
              >{{ area }}</span
            >
          </div>
          <p class="card-text ">{{ description }}</p>
        </div>
        <div class="card-footer">
          <h5>Interested? Reach out now</h5>
          <router-view />
          <router-link :to="contactLink" class="btn btn-warning"
            >Contact</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // Get id props from route
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      return `${this.$route.path}/contact`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/coaches"].find(
      (c) => c.id === this.id
    );
  },
};
</script>

<style scoped>
.areas {
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.area {
  color: orange;
  margin-right: 1rem;
  padding: 5px 10px;
  background-color: #eee;
  border-radius: 7px;
}
</style>
