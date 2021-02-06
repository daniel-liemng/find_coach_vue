<template>
  <div>
    <h2 class="text-center mt-4 mb-3">Register as a coach now</h2>
    <CoachForm @form-data="saveData" />
  </div>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm";

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      // dispatch action
      this.$store.dispatch("coaches/registerCoach", data);
      // navigate
      this.$router.replace("coaches");
    },
  },
};
</script>

<style></style>
