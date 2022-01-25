<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comments']" size="lg" />
      <strong class="text-2xl">課程心得 / 討論</strong>
    </h3>
    <div
      class="flex flex-col pl-5 mb-4 border-l-4 border-green-400"
      v-for="reviewData of reviewsData"
    >
      <div>
        {{ reviewData.content }}
      </div>
      <div class="flex justify-end space-x-2 pr-5 py-2">
        <div
          class="cursor-pointer"
          @click="reation('review', 'like', reviewData.id, reviewsData)"
        >
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          {{ reviewData.likes.length }}
        </div>
        <div
          class="cursor-pointer"
          @click="reation('review', 'dislike', reviewData.id, reviewsData)"
        >
          <font-awesome-icon :icon="['fas', 'thumbs-down']" />
          {{ reviewData.dislikes.length }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reation } from "@/helpers/course-info";
const props = defineProps<{ reviewsData: any[] }>();
</script>
