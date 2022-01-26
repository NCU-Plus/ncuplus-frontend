<template>
  <div class="md:container mx-auto min-h-screen">
    <div class="w-3/4 h-full mx-auto mt-12 mb-12 flex flex-col space-y-10">
      <!--Title-->
      <section class="mt-10">
        <h1 class="text-3xl">
          {{ courseData.title }} - {{ courseData.teachers }}
        </h1>
      </section>
      <!--info-->
      <section>
        <h3 class="flex space-x-3 items-center mb-10">
          <font-awesome-icon :icon="['fa', 'book']" size="lg" />
          <strong class="text-2xl">課程資訊</strong>
        </h3>
        <table class="w-1/3 h-24">
          <tbody>
            <tr>
              <td>
                課號: <strong>{{ courseData.classNo }}</strong>
              </td>
              <td>
                學分: <strong>{{ courseData.credit }}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <a
                  target="_blank"
                  class="text-sky-600 hover:text-sky-800"
                  :href="`https://cis.ncu.edu.tw/Course/main/query/byKeywords?serialNo=${
                    courseData.serialNo
                  }&outline=${courseData.serialNo}&semester=${courseData.year}${
                    courseData.semester + 1
                  }`"
                  >課程綱要</a
                >
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-3/4 h-24 text-center">
          <tbody>
            <tr class="border-t-[1px] border-slate-300">
              <td>學期</td>
              <td>系所</td>
              <td>編號</td>
              <td>選別</td>
              <td>修課上限</td>
              <td>時間</td>
              <td>密碼卡</td>
            </tr>
            <tr class="border-t-[1px] border-slate-300">
              <td>
                {{ courseData.year }}-{{ formatSemester(courseData.semester) }}
              </td>
              <td>{{ courseData.departmentName }}</td>
              <td>{{ courseData.serialNo }}</td>
              <td>{{ formatCourseType(courseData.courseType) }}</td>
              <td>{{ courseData.limitCnt }}</td>
              <td>{{ courseData.classTimes }}</td>
              <td>{{ formatPasswordCard(courseData.passwordCard) }}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <!--comment-->
      <Comments
        :courseId="Number(id)"
        :commentsData="commentsData"
        :editing="editingComment"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="add('comment', $event.courseId, $event.content, commentsData)"
        @reaction="
          reaction('comment', $event.operation, $event.id, commentsData)
        "
        @completeEdit="
          edit('comment', $event.id, $event.content, commentsData);
          editingComment = 0;
        "
        @cancelEdit="editingComment = 0"
      />
      <!--review-->
      <Reviews
        :courseId="Number(id)"
        :reviewsData="reviewsData"
        :editing="editingReview"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="add('review', $event.courseId, $event.content, reviewsData)"
        @reaction="reaction('review', $event.operation, $event.id, reviewsData)"
        @completeEdit="
          edit('review', $event.id, $event.content, reviewsData);
          editingReview = 0;
        "
        @cancelEdit="editingReview = 0"
      />
      <!--test-->
      <section>
        <h3 class="flex space-x-3 items-center mb-10">
          <font-awesome-icon :icon="['fa', 'clipboard-list']" size="lg" />
          <strong class="text-2xl">考古題</strong>
        </h3>
        <table class="w-full bg-gray-50 rounded-t mb-32">
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
              <td class="py-2 text-center">下載次數</td>
              <td class="py-2 text-center">檔名</td>
              <td class="py-2 text-center">年度</td>
              <td class="py-2 text-center">檔案說明</td>
              <td class="py-2 text-center">大小</td>
              <td class="py-2 text-center">上傳者</td>
              <td class="py-2 text-center">上傳時間</td>
              <td class="py-2 text-center">動作</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <DropdownMenu
      :dropdownMenuOptions="dropdownMenuOptions"
      @edit="setEditing()"
      @delete="dele()"
    />
  </div>
</template>

<script setup lang="ts">
import { CourseData } from "@/components/courses/CourseData";
import axios from "axios";
import { onBeforeMount, reactive, ref } from "vue";
import {
  mapCourseData,
  formatCourseType,
  formatSemester,
  formatPasswordCard,
} from "@/helpers/course";
import Comments from "@/components/courses/Comments.vue";
import Reviews from "@/components/courses/Reviews.vue";
import DropdownMenu from "@/components/courses/DropdownMenu.vue";
import { DropdownMenuOptions } from "@/components/courses/DropdownMenuOptions";
import { reaction, del, edit, add } from "@/helpers/course-info";

const props = defineProps<{ id: string }>();
const courseData = ref({} as CourseData);
const commentsData = reactive([] as any[]);
const reviewsData = reactive([] as any[]);
const pastExamsData = ref([] as any[]);
const dropdownMenuOptions = reactive({
  type: "",
} as DropdownMenuOptions);
const editingComment = ref(0);
const editingReview = ref(0);

onBeforeMount(async () => {
  const course = await axios.get(
    process.env.VITE_APP_API_URL + `/courses/${props.id}`
  );
  courseData.value = { ...(await mapCourseData([course.data.data]))[0] };
  const courseInfo = await axios.get(
    process.env.VITE_APP_API_URL + `/course-info/${props.id}`
  );
  for (const commentData of courseInfo.data.data.comments)
    commentsData.push(commentData);
  for (const reviewData of courseInfo.data.data.reviews)
    reviewsData.push(reviewData);
});

function openDropdownMenu(data: DropdownMenuOptions) {
  dropdownMenuOptions.show = data.show;
  dropdownMenuOptions.type = data.type;
  dropdownMenuOptions.id = data.id;
  dropdownMenuOptions.isAuthor = data.isAuthor;
  dropdownMenuOptions.position = data.position;
}

function setEditing() {
  if (dropdownMenuOptions.type === "comment") {
    editingComment.value = dropdownMenuOptions.id;
  } else {
    editingReview.value = dropdownMenuOptions.id;
  }
}

function dele() {
  if (dropdownMenuOptions.type === "comment")
    del(dropdownMenuOptions.type, dropdownMenuOptions.id, commentsData);
  else del(dropdownMenuOptions.type, dropdownMenuOptions.id, reviewsData);
}
</script>
