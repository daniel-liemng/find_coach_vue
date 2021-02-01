<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          v-model.trim="firstName"
        />
      </div>

      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model.trim="lastName"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="5"
          v-model.trim="description"
        />
      </div>

      <div class="mb-3">
        <label for="rate" class="form-label">Hourly Rate</label>
        <input
          type="number"
          class="form-control"
          id="rate"
          v-model.number="rate"
        />
      </div>

      <label for="area" class="form-label">Areas of Expertise</label>
      <div class="d-flex justify-content-start">
        <div class="mb-3 form-check" style="margin-right: 10px">
          <input
            type="checkbox"
            class="form-check-input"
            id="frontend"
            value="frontend"
            v-model="areas"
          />
          <label class="form-check-label" for="frontend"
            >Frontend Development</label
          >
        </div>
        <div class="mb-3 form-check" style="margin-right: 10px">
          <input
            type="checkbox"
            class="form-check-input"
            id="backend"
            value="backend"
            v-model="areas"
          />
          <label class="form-check-label" for="backend"
            >Backend Development</label
          >
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="career"
            value="career"
            v-model="areas"
          />
          <label class="form-check-label" for="career">Career Advisory</label>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      rate: null,
      areas: [],
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        first: this.firstName,
        last: this.lastName,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };

      console.log(formData);
    },
  },
};
</script>

<style></style>
