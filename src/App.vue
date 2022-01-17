<template>
  <div class="flex flex-col">
    <NavBar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
</script>
