<template>
  <div class="container mt-4 mb-3">
    <h2>Find your coach</h2>
    <div
      class="btn-group"
      role="group"
      aria-label="Basic checkbox toggle button group"
    >
      <input
        type="checkbox"
        class="btn-check"
        id="frontend"
        autocomplete="off"
        checked
        @change="setFilters"
      />
      <label class="btn btn-outline-primary" for="frontend">Frontend</label>

      <input
        type="checkbox"
        class="btn-check"
        id="backend"
        autocomplete="off"
        checked
        @change="setFilters"
      />
      <label class="btn btn-outline-primary" for="backend">Backend</label>

      <input
        type="checkbox"
        class="btn-check"
        id="career"
        autocomplete="off"
        checked
        @change="setFilters"
      />
      <label class="btn btn-outline-primary" for="career">Career</label>
    </div>
  </div>
  <pre>{{ JSON.stringify(filters) }}</pre>
</template>

<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilters(event) {
      const updatedFilters = {
        ...this.filters,
        [event.target.id]: event.target.checked,
      };

      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
  },
};
</script>

<style></style>
