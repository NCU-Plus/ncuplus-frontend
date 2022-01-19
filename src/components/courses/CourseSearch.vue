<template>
  <form class="">
    <div class="flex my-6 justify-center">
      <input class="rounded-l-md" />
      <button class="display-block w-8 h-8 bg-sky-500 rounded-r-md">
        <font-awesome-icon class="text-white" :icon="['fa', 'search']" />
      </button>
      <div class="mx-4 flex items-center">
        <input id="advanceSearch" v-model="advanceSearch" type="checkbox" />
        <label>進階搜尋</label>
      </div>
    </div>
    <div id="searchOptions" v-show="advanceSearch" class="flex my-6 space-x-2">
      <div class="w-36 h-8">
        <select
          v-model="searchOptions.semester"
          class="pl-4 pr-1 w-full h-full"
        >
          <option value="">所有學期</option>
        </select>
      </div>
      <div class="w-32 h-8">
        <select v-model="searchOptions.degree" class="pl-4 pr-1 w-full h-full">
          <option value="">分類</option>
        </select>
      </div>
      <div class="w-96 h-8">
        <select
          v-model="searchOptions.department"
          class="pl-4 pr-1 w-full h-full"
        >
          <option value="">系所</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { SearchOptions } from "./SearchOptions";
const advanceSearch = ref(false);
const searchOptions = reactive(<SearchOptions>{
  semester: "",
  degree: "",
  department: "",
});

const emit = defineEmits(["search"]);

watch(
  () => ({ ...searchOptions }),
  () => {
    emit("search", { ...searchOptions });
  }
);
</script>
