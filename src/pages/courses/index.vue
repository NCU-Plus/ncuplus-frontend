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
import { onBeforeMount, reactive, ref, watch } from "vue";
import axios from "axios";

const coursesData = ref([] as CourseData[]);

onBeforeMount(async () => {
  const departmentMap = new Map<string, string>();
  const collegeMap = new Map<string, string>();
  const departments = axios.get(
    import.meta.env.VITE_APP_API_URL + "/departments"
  );
  const colleges = axios.get(import.meta.env.VITE_APP_API_URL + "/colleges");
  const courses = axios.get(import.meta.env.VITE_APP_API_URL + "/courses");
  for (const department of (await departments).data.data)
    departmentMap.set(department.departmentId, department.departmentName);
  for (const college of (await colleges).data.data)
    collegeMap.set(college.collegeId, college.collegeName);

  for (const courseData of ((await courses).data.data as any[]).map(
    (course) => {
      return {
        ...course,
        collegeName: collegeMap.get(course.collegeId),
        departmentName: departmentMap.get(course.departmentId),
        classTimes: (JSON.parse(course.classTimes) as string[]).join(", "),
        teachers: (JSON.parse(course.teachers) as string[]).join(", "),
      };
    }
  )) {
    coursesData.value.push(courseData);
    filteredCoursesData.value.push(courseData);
  }
});

const searchOptions = reactive({
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
      });
  }
);

const onSearch = (options: SearchOptions) => {
  searchOptions.department = options.department;
  searchOptions.semester = options.semester;
};
</script>
