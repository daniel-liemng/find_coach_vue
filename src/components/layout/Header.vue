<template>
  <nav class="navbar navbar-light bg-light navbar-expand-md">
    <div class="container">
      <a class="navbar-brand text-danger text-uppercase">Find a Coach</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/coaches"
              >Coaches</router-link
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/requests"
              >Requests</router-link
            >
          </li>
          <li v-else class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/auth"
              >Login</router-link
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button
              @click="logout"
              class="nav-link active logout-btn"
              aria-current="page"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");

      // redirect
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
.logout-btn {
  border: none;
  outline: none;
  background: transparent;
}
</style>
