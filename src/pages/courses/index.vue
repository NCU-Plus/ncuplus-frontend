<template>
  <div class="md:container mx-auto mt-12 mb-12 flex flex-col items-center">
    <CourseSearch :courses-data="coursesData" @search="onSearch" />
    <CourseList :courses-data="filteredCoursesData" />
  </div>
</template>

<script setup lang="ts">
import CourseSearch from "@/components/courses/CourseSearch.vue";
import CourseList from "@/components/courses/CourseList.vue";
import { SearchOptions } from "@/components/courses/SearchOptions";
import { CourseData } from "@/components/courses/CourseData";
import { reactive, ref, watch } from "vue";

// TODO: use axios get course data
// import.meta.env.VITE_APP_API_URL
const coursesData: CourseData[] = [];

const searchOptions = reactive({
  semester: "",
  department: "",
} as SearchOptions);

let filteredCoursesData = ref(coursesData);

watch(
  () => ({ ...searchOptions }),
  () => {
    filteredCoursesData.value = coursesData
      .filter((courseData) => {
        if (searchOptions.semester !== "")
          return (
            courseData.year + "-" + courseData.semester ===
            searchOptions.semester
          );
        else return true;
      })
      .filter((courseData) => {
        if (searchOptions.department !== "")
          return courseData.departmentName === searchOptions.department;
        else return true;
      });
  }
);

const onSearch = (options: SearchOptions) => {
  searchOptions.department = options.department;
  searchOptions.semester = options.semester;
};
</script>
