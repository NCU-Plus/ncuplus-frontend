<template>
  <div
    class="fixed flex justify-between h-12 w-full font-sans text-lg bg-sky-400 text-white z-50"
  >
    <ul class="flex ml-96">
      <li class="h-full w-24 text-center flex justify-center">
        <router-link class="flex items-center" to="/">NCU+</router-link>
      </li>
      <li class="h-full w-24 text-center flex justify-center">
        <router-link class="flex items-center" to="/courses">課程</router-link>
      </li>
    </ul>
    <ul class="flex mr-72">
      <li class="h-full w-24 text-center flex justify-center">
        <router-link class="flex items-center" to="/login">登入</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>
