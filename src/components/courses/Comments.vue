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
              class="cursor-pointer"
              @click="reation('comment', 'like', commentData.id, commentsData)"
            >
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
              {{ commentData.likes.length }}
            </div>
            <div
              class="cursor-pointer"
              @click="
                reation('comment', 'dislike', commentData.id, commentsData)
              "
            >
              <font-awesome-icon :icon="['fas', 'thumbs-down']" />
              {{ commentData.dislikes.length }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reation } from "@/helpers/reaction";
const props = defineProps<{ commentsData: any[] }>();
</script>
