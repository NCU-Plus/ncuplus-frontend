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
    <div class="flex flex-col pl-5 mb-4 border-l-4 border-green-400 space-y-2">
      <textarea
        class="px-5 py-1 h-60 outline outline-gray-200 rounded-sm resize-none"
        placeholder="我要發文..."
        v-model="content"
        maxlength="255"
      >
      </textarea>
      <div class="flex justify-end">
        <button
          @click="add('review', courseId, content, reviewsData)"
          class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
        >
          送出
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reation, add } from "@/helpers/course-info";
import { ref } from "vue";
const props = defineProps<{ courseId: number; reviewsData: any[] }>();
const content = ref("");
</script>
