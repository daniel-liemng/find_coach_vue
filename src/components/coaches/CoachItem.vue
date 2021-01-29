<template>
  <div class="card" style="margin-bottom: 1rem">
    <div class="card-body">
      <h5 class="card-title">{{ fullName }}</h5>
      <p class="card-text">${{ hourlyRate }}/hour</p>
      <div class="areas">
        <span v-for="(area, index) in areas" :key="index" class="area">{{
          area
        }}</span>
      </div>
      <div class="d-flex justify-content-end">
        <router-link :to="coachContactLink" class="btn btn-primary"
          >Contact</router-link
        >
        <router-link
          :to="coachDetailsLink"
          class="btn btn-primary"
          style="margin-left: 10px"
          >View Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "firstName", "lastName", "hourlyRate", "areas"],
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContactLink() {
      // /coaches/c1/contact
      return `${this.$route.path}/${this.id}/contact`;
    },
    coachDetailsLink() {
      // /coaches/c1
      return `${this.$route.path}/${this.id}`;
    },
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
