<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'comment']" size="lg" />
      <strong class="text-2xl">留言板</strong>
    </h3>
    <div class="bg-gray-300 h-fit min-h-full rounded-xl text-center">
      <div v-if="commentsData.length === 0" class="p-8">
        <strong v-if="commentsData.length === 0">尚無留言</strong>
      </div>
      <div v-else>
        <div class="flex justify-between" v-for="commentData of commentsData">
          <p class="align-middle px-5 py-2 my-auto">
            {{ commentData.content }}
          </p>
          <div class="flex space-x-2 items-center px-5 py-2">
            <div
              class="cursor-pointer flex items-center"
              @click="reation('comment', 'like', commentData.id, commentsData)"
            >
              <font-awesome-icon :icon="['fas', 'thumbs-up']" class="mr-1" />
              {{ commentData.likes.length }}
            </div>
            <div
              class="cursor-pointer flex items-center"
              @click="
                reation('comment', 'dislike', commentData.id, commentsData)
              "
            >
              <font-awesome-icon :icon="['fas', 'thumbs-down']" class="mr-1" />
              {{ commentData.dislikes.length }}
            </div>
          </div>
        </div>
      </div>
      <textarea
        class="px-5 py-1 mb-4 w-4/5 outline outline-gray-200 rounded-sm resize-none"
        placeholder="留言... (Shift + Enter來發送訊息)"
        v-model="content"
        maxlength="255"
        @keypress.shift.enter="
          add('comment', courseId, content, commentsData);
          content = '';
        "
      ></textarea>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reation, add } from "@/helpers/course-info";
import { ref } from "vue";
const props = defineProps<{ courseId: number; commentsData: any[] }>();

const content = ref("");
</script>
