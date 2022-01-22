<template>
  <div class="md:container mx-auto min-h-screen">
    <div class="w-3/4 h-full mx-auto mt-12 mb-12 flex flex-col items-center">
      <CourseSearch :courses-data="coursesData" @search="onSearch" />
      <CourseList :courses-data="filteredCoursesData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CourseSearch from "@/components/courses/CourseSearch.vue";
import CourseList from "@/components/courses/CourseList.vue";
import { SearchOptions } from "@/components/courses/SearchOptions";
import { CourseData } from "@/components/courses/CourseData";
import { onBeforeMount, reactive, ref, watch } from "vue";
import axios from "axios";
import { mapCourseData } from "@/helpers/course";

const coursesData = ref([] as CourseData[]);

onBeforeMount(async () => {
  const courses = await axios.get(
    import.meta.env.VITE_APP_API_URL + "/courses"
  );
  const mappedCoursesData = await mapCourseData(courses.data.data);
  coursesData.value = mappedCoursesData.slice();
  filteredCoursesData.value = mappedCoursesData.slice();
});

const searchOptions = reactive({
  query: "",
  semester: "",
  department: "",
} as SearchOptions);

const filteredCoursesData = ref([] as CourseData[]);

watch(
  () => ({ ...searchOptions }),
  () => {
    filteredCoursesData.value = coursesData.value
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
      })
      .filter((courseData) => {
        if (searchOptions.query !== "")
          return (
            courseData.title.includes(searchOptions.query) ||
            courseData.teachers.includes(searchOptions.query) ||
            courseData.classNo.includes(searchOptions.query)
          );
        else return true;
      });
  }
);

const onSearch = (options: SearchOptions) => {
  searchOptions.query = options.query;
  searchOptions.department = options.department;
  searchOptions.semester = options.semester;
};
</script>
