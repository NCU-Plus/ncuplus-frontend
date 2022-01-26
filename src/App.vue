<template>
  <div class="flex flex-col w-full">
    <Navbar />
    <Toast />
    <router-view></router-view>
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import Navbar from "./components/Navbar.vue";
import PageFooter from "./components/PageFooter.vue";
import Toast from "./components/Toast.vue";
import { initUsernameMap } from "./helpers/user";

onBeforeMount(async () => {
  await initUsernameMap();
});
</script>
