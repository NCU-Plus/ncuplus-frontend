<template>
  <div class="md:container mx-auto mt-12 mb-12 flex flex-col items-center">
    <CourseSearch @search="onSearch" />
    <table>
      <tbody></tbody>
      <tbody></tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import CourseSearch from "@/components/courses/CourseSearch.vue";
import { SearchOptions } from "@/components/courses/SearchOptions";

const onSearch = (options: SearchOptions) => {
  // do search
};
</script>
