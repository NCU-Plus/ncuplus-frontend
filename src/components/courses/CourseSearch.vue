<template>
  <form class="">
    <div class="flex my-6 justify-center">
      <input class="rounded-l-md pl-4" />
      <button class="display-block w-8 h-8 bg-sky-500 rounded-r-md">
        <font-awesome-icon class="text-white" :icon="['fa', 'search']" />
      </button>
      <div class="mx-4 flex items-center">
        <input id="advanceSearch" v-model="advanceSearch" type="checkbox" />
        <label>進階搜尋</label>
      </div>
    </div>
    <div id="searchOptions" v-show="advanceSearch" class="flex my-6 space-x-2">
      <div class="w-28 h-10">
        <select
          v-model="searchOptions.semester"
          class="pl-4 pr-9 py-0 w-full h-full"
        >
          <option value="">所有學期</option>
          <option
            :class="'s' + semester"
            v-for="semester in semesters"
            :value="semester"
          >
            {{ semester }}
          </option>
        </select>
      </div>
      <div class="w-96 h-10">
        <select
          v-model="searchOptions.department"
          class="pl-4 pr-9 py-0 w-full h-full"
        >
          <option value="">系所</option>
          <option
            :class="department"
            v-for="department in departments"
            :value="department"
          >
            {{ department }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { CourseData } from "./CourseData";
import { SearchOptions } from "./SearchOptions";
const advanceSearch = ref(false);
const searchOptions = reactive(<SearchOptions>{
  semester: "",
  department: "",
});

const props = defineProps<{
  coursesData: CourseData[];
}>();
const emit = defineEmits(["search"]);

const semesters = computed(() => {
  const semesters = new Set<string>();
  for (const courseData of props.coursesData) {
    semesters.add(courseData.year + "-" + courseData.semester);
  }
  return Array.from(semesters).sort();
});

const departments = computed(() => {
  const departments = new Set<string>();
  for (const courseData of props.coursesData) {
    departments.add(courseData.departmentName);
  }
  return Array.from(departments).sort();
});

watch(
  () => ({ ...searchOptions }),
  () => {
    emit("search", { ...searchOptions });
  }
);
</script>
