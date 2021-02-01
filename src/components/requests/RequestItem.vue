<template>
  <div class="card" style="margin-bottom: 1rem">
    <div class="card-body">
      <a :href="emailLink" class="email-link">{{ email }}</a>
      <h5 class="card-text mt-2">{{ message }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ["email", "message"],
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
  },
};
</script>

<style scoped>
.email-link {
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
