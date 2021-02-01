<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="firstname" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          v-model.trim="firstName.val"
          :class="{ invalid: !firstName.isValid }"
          @blur="clearValidity('firstName')"
        />
        <p v-if="!firstName.isValid" style="color: red">
          First name must not be empty
        </p>
      </div>

      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model.trim="lastName.val"
          :class="{ invalid: !lastName.isValid }"
          @blur="clearValidity('lastName')"
        />
        <p v-if="!lastName.isValid" style="color: red">
          Last name must not be empty
        </p>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model.trim="description.val"
          :class="{ invalid: !description.isValid }"
          @blur="clearValidity('description')"
        />
        <p v-if="!description.isValid" style="color: red">
          Description must not be empty
        </p>
      </div>

      <div class="mb-3">
        <label for="rate" class="form-label">Hourly Rate</label>
        <input
          type="number"
          class="form-control"
          id="rate"
          v-model.number="rate.val"
          :class="{ invalid: !rate.isValid }"
          @blur="clearValidity('rate')"
        />
        <p v-if="!rate.isValid" style="color: red">
          Hourly rate must not be less than 0
        </p>
      </div>

      <label for="area" class="form-label">Areas of Expertise</label>
      <div class="d-flex justify-content-start">
        <div class="mb-3 form-check" style="margin-right: 10px">
          <input
            type="checkbox"
            class="form-check-input"
            id="frontend"
            value="frontend"
            v-model="areas.val"
            :class="{ invalid: !areas.isValid }"
            @blur="clearValidity('areas')"
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
            v-model="areas.val"
            :class="{ invalid: !areas.isValid }"
            @blur="clearValidity('areas')"
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
            v-model="areas.val"
            :class="{ invalid: !areas.isValid }"
            @blur="clearValidity('areas')"
          />
          <label class="form-check-label" for="career">Career Advisory</label>
        </div>
      </div>
      <p v-if="!areas.isValid" style="color: red">
        At least one expertise must selected
      </p>

      <!-- Validation Info -->
      <p v-if="!formIsValid" style="color: red">
        ** Please fix the above errors and submit again **
      </p>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  emits: ["form-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    handleSubmit() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
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
