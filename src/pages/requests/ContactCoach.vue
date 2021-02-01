<template>
  <div class="container">
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
      <p v-if="!formIsValid" style="color: red">
        ** Please fix the above errors and submit again **
      </p>

      <button type="submit" class="btn btn-primary">Send message</button>
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
    };
  },
  methods: {
    handleSubmit() {
      this.formIsValid = true;

      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }

      const formData = {
        email: this.email.val,
        message: this.message.val,
      };

      this.$emit("form-data", formData);
    },
  },
};
</script>

<style scoped>
.invalid {
  border-color: red;
}
</style>
