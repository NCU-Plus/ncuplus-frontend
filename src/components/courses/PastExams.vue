<template>
  <section>
    <h3 class="flex space-x-3 items-center mb-10">
      <font-awesome-icon :icon="['fa', 'clipboard-list']" size="lg" />
      <strong class="text-2xl">考古題</strong>
    </h3>
    <table class="w-full bg-gray-50 rounded-t mb-4">
      <thead>
        <tr>
          <th class="py-2">下載次數</th>
          <th class="py-2">檔名</th>
          <th class="py-2">年度</th>
          <th class="py-2">檔案說明</th>
          <th class="py-2">大小</th>
          <th class="py-2">上傳者</th>
          <th class="py-2">上傳時間</th>
          <th class="py-2">動作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="pastExamsData.length === 0"
          class="text-center border-t-[1px] border-slate-300"
        >
          <td colspan="8">
            <h4 class="py-2 w-full">尚無檔案</h4>
          </td>
        </tr>
        <tr
          class="border-t-[1px] border-slate-300"
          v-for="pastExamData of pastExamsData"
        >
          <td class="py-2 text-center">{{ pastExamData.downloadCount }}</td>
          <td class="py-2 text-center">{{ pastExamData.originFilename }}</td>
          <td class="py-2 text-center">{{ pastExamData.year }}</td>
          <td class="py-2 text-center">{{ pastExamData.description }}</td>
          <td class="py-2 text-center">
            {{ formatFilesize(pastExamData.size) }}
          </td>
          <td class="py-2 text-center">
            {{ getUsernameById(pastExamData.uploaderId) }}
          </td>
          <td
            v-if="pastExamData.createdAt === pastExamData.updatedAt"
            class="py-2 text-center"
          >
            {{ toDatetimeString(pastExamData.createdAt) }}
          </td>
          <td v-else class="py-2 text-center">
            {{ toDatetimeString(pastExamData.updatedAt) }}
          </td>
          <td class="py-2 text-center flex space-x-2 justify-center">
            <button
              class="p-1 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
            >
              編輯</button
            ><button
              class="p-1 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full mb-14 flex justify-end">
      <transition name="form-fade">
        <div v-show="uploading" class="flex space-x-4 items-center mx-4">
          <input
            v-model="uploadData.year"
            class="pl-2 rounded-sm"
            placeholder="考古年度"
            required
          />
          <input
            v-model="uploadData.description"
            class="pl-2 rounded-sm"
            placeholder="檔案說明"
            required
          />
          <input @change="setUploadFile" type="file" required />
          <button
            @click="upload"
            class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
          >
            送出
          </button>
        </div></transition
      >
      <button
        @click="uploading = !uploading"
        class="px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-md"
      >
        我要上傳
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { toDatetimeString } from "@/helpers/time";
import { getUsernameById } from "@/helpers/user";
import { formatFilesize } from "@/helpers/file";

const props = defineProps<{ pastExamsData: any[] }>();
const emits = defineEmits<{
  (
    event: "upload",
    data: { year: string; description: string; file: File }
  ): void;
}>();

const uploading = ref(false);
const uploadData = reactive(
  {} as { year: string; description: string; file: File }
);

function setUploadFile(event: any) {
  uploadData.file = event.target.files[0];
}

async function upload() {
  emits("upload", uploadData);
  uploadData.year = "";
  uploadData.description = "";
  uploading.value = !uploading.value;
}
</script>

<style scoped>
.form-fade-enter-active {
  transition: all 0.3s ease-out;
}

.form-fade-leave-active {
  transition: all 0.3s ease-out;
}

.form-fade-enter-from,
.form-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
