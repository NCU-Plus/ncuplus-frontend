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
        <div
          class="flex justify-between items-center w-full"
          v-for="commentData of commentsData"
        >
          <div class="flex flex-col w-full">
            <div class="flex justify-between w-full">
              <textarea
                v-if="editing === commentData.id"
                class="ml-8 mt-4 w-full outline outline-gray-200 rounded-sm resize-none"
                maxlength="255"
                v-model="commentData.content"
                @keypress.shift.enter="
                  edit(
                    'comment',
                    commentData.id,
                    commentData.content,
                    commentsData
                  );
                  editing = 0;
                "
                @keydown.esc="editing = 0"
              ></textarea>
              <p v-else class="align-middle mx-8 mt-4 my-auto">
                {{ commentData.content }}
              </p>
            </div>
            <div
              class="flex mx-8 text-sm text-gray-600"
              v-if="editing === commentData.id"
            >
              按Shift+Enter送出，或按Esc取消
            </div>
            <div v-else class="flex space-x-2 items-center mx-8">
              <div
                class="cursor-pointer flex items-center"
                @click="
                  reation('comment', 'like', commentData.id, commentsData)
                "
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
                <font-awesome-icon
                  :icon="['fas', 'thumbs-down']"
                  class="mr-1"
                />
                {{ commentData.dislikes.length }}
              </div>
            </div>
          </div>
          <div
            class="w-6 h-full mx-8 cursor-pointer open-dropdown-menu"
            @click="openDropdownMenu(commentData.id, $event)"
            v-click-outside="listener"
          >
            <font-awesome-icon
              class="hover:scale-110"
              :icon="['fas', 'ellipsis-v']"
              size="lg"
            />
          </div>
        </div>
      </div>
      <textarea
        class="mx-8 my-4 w-4/5 outline outline-gray-200 rounded-sm resize-none"
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
import { reation, add, edit } from "@/helpers/course-info";
import { ref } from "vue";
import { DropdownMenuOptions } from "./DropdownMenuOptions";

const props =
  defineProps<{ courseId: number; commentsData: any[]; editing: number }>();
const emits = defineEmits<{
  (event: "openDropdownMenu", data: DropdownMenuOptions): void;
  (event: "closeDropdownMenu"): void;
}>();

const content = ref("");

function openDropdownMenu(id: number, event: MouseEvent) {
  emits("openDropdownMenu", {
    type: "comment",
    show: true,
    id: id,
    isAuthor: true, // TODO: check user is a author
    position: {
      x: event.pageX,
      y: event.pageY,
    },
  });
}

function listener(el: Element) {
  return (event: MouseEvent) => {
    if (
      !(event.target as Element).isEqualNode(el) &&
      !(event.target as Element).parentElement?.isEqualNode(el) &&
      !(event.target as Element).parentElement?.parentElement?.isEqualNode(el)
    ) {
      emits("closeDropdownMenu");
    }
  };
}
</script>
