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
};
</script>

<style></style>
