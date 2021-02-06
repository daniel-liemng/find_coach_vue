<template>
  <div class="container request-form">
    <h3 class="text-center">Contact</h3>
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
        <label for="message" class="form-label">Message</label>
        <textarea
          class="form-control"
          id="message"
          rows="3"
          v-model.trim="message"
        />
      </div>

      <!-- Validation Info -->
      <p v-if="!formIsValid" class="error">
        ** Please fix the above input errors and submit again **
      </p>

      <!-- Show error of dispatching action -->
      <div v-show="error" class=" mb-3 error">
        {{ error }}
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!!isLoading">
        Send message
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async handleSubmit() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }

      // before dispatch action
      this.isLoading = true;
      this.error = null;

      // dispatch action -> wait for the result of dispatch to see success or error
      try {
        await this.$store.dispatch("requests/contactCoach", {
          email: this.email,
          message: this.message,
          coachId: this.$route.params.id,
        });
      } catch (err) {
        this.error = err.message || "Something went wrong!";
      }

      // after dispatch action
      this.isLoading = false;

      // redirect
      if (!this.error) {
        this.$router.replace("/coaches");
      }
    },
  },
};
</script>

<style scoped>
.request-form {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid orange;
  border-radius: 5px;
}
.invalid {
  border-color: red;
}
.error {
  background-color: pink;
  color: red;
  font-weight: bold;
  padding: 0.5rem 1rem;
  width: 50%;
}
</style>
