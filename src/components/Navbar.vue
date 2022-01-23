<template>
  <nav class="flex items-center bg-blue-400 p-3  text-white fixed w-full z-50 h-50">
    <router-link class="ml-48 p-2 mr-4 inline-flex items-center" to="/">NCU+</router-link>
  
      <button
        class="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <font-awesome-icon
          class="hover:text-slate-400 transition-colors duration-300"
          :icon="['fas', 'bars']"
      />
      </button>
      <div
        class="mr-48 hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
      >
        <div
          class="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
        >
            <router-link class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  items-center justify-center hover:bg-white hover:text-black" to="/courses">課程</router-link>
            <router-link class="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded  items-center justify-center hover:bg-white hover:text-black" to="/login">登入</router-link>
        </div>
      </div>
    </nav>
</template>

<script setup lang="ts">
</script>