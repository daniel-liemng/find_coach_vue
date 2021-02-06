<template>
  <div class="container w-50">
    <h2 class="text-center mt-4 mb-3">{{ titleCaption }}</h2>

    <div v-show="error" class="container mb-3 error">
      {{ error }}
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model.trim="email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model.trim="password"
        />
      </div>

      <!-- Validation Info -->
      <p v-if="!formIsValid" style="color: red">
        ** Please check email and password is at least 6 characters long. **
      </p>

      <div class="d-flex justify-content-around">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ submitBtnCaption }}
        </button>
        <button type="button" class="btn btn-secondary" @click="switchAuthMode">
          {{ switchBtnCaption }} Instead
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    titleCaption() {
      return this.mode === "login" ? "Login" : "Sign Up";
    },
    submitBtnCaption() {
      return this.mode === "login" ? "Login" : "Sign Up";
    },
    switchBtnCaption() {
      return this.mode === "login" ? "Sign Up" : "Login";
    },
  },
  methods: {
    async handleSubmit() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      // before dispatch
      this.isLoading = true;
      this.error = null;

      try {
        // Send HTTP requests
        if (this.mode === "login") {
          // Login
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
        } else {
          // Signup
          await this.$store.dispatch("signup", {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        this.error =
          err.message || "Failed to authenticate. Check your login data";
      }

      // after dispatch
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style scoped>
.error {
  background-color: pink;
  color: red;
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0;
  width: 50%;
}
</style>
