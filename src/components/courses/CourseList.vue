<template>
  <table class="bg-white">
    <tbody>
      <tr>
        <th class="p-2 align-middle border-t-gray-400">學期</th>
        <th class="p-2 align-middle border-t-gray-400">課名</th>
        <th class="p-2 align-middle border-t-gray-400">教師</th>
        <th class="p-2 align-middle border-t-gray-400">系所</th>
        <th class="p-2 align-middle border-t-gray-400">時間</th>
      </tr>
    </tbody>
    <tbody>
      <tr
        :id="courseData.semester + courseData.serialNo"
        v-for="courseData of coursesData"
      >
        <th class="p-2 align-middle border-t-gray-400">
          {{ courseData.year }}-{{ courseData.semester }}
        </th>
        <th class="p-2 align-middle border-t-gray-400">
          {{ courseData.title }}
        </th>
        <th class="p-2 align-middle border-t-gray-400">
          {{ courseData.teachers }}
        </th>
        <th class="p-2 align-middle border-t-gray-400">
          {{ courseData.departmentName }}
        </th>
        <th class="p-2 align-middle border-t-gray-400">
          {{ courseData.classTimes }}
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { CourseData } from "./CourseData";

const props = defineProps<{
  coursesData: CourseData[];
}>();
</script>
