<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "./components/layout/Header";
export default {
  setup() {
    return {
      Header,
    };
  },
};
</script>

<style></style>
