<template>
  <div class="flex flex-col">
    <Navbar />
    <router-view></router-view>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import PageFooter from "./components/PageFooter.vue";
</script>
