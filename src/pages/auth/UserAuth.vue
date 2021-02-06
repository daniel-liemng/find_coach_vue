<template>
  <div class="container w-50">
    <h2 class="text-center mt-4 mb-3">{{ titleCaption }}</h2>
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

      <div class="d-flex justify-content-around">
        <button type="submit" class="btn btn-primary">
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
    handleSubmit() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      // Send HTTP requests
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

<style></style>
