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
        :commentsData="commentsData"
        :editing="editingComment"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="add('comment', id, $event.content, commentsData)"
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
        :reviewsData="reviewsData"
        :editing="editingReview"
        @openDropdownMenu="openDropdownMenu"
        @closeDropdownMenu="dropdownMenuOptions.show = false"
        @add="add('review', id, $event.content, reviewsData)"
        @reaction="reaction('review', $event.operation, $event.id, reviewsData)"
        @completeEdit="
          edit('review', $event.id, $event.content, reviewsData);
          editingReview = 0;
        "
        @cancelEdit="editingReview = 0"
      />
      <!--past exams-->
      <PastExams
        :pastExamsData="pastExamsData"
        @upload="uploadPastExam(id, $event, pastExamsData)"
      />
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
import {
  reaction,
  del,
  edit,
  add,
  uploadPastExam,
} from "@/helpers/course-info";
import PastExams from "@/components/courses/PastExams.vue";

const props = defineProps<{ id: string }>();
const courseData = ref({} as CourseData);
const commentsData = reactive([] as any[]);
const reviewsData = reactive([] as any[]);
const pastExamsData = reactive([] as any[]);
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
  for (const pastExamData of courseInfo.data.data.pastExams)
    pastExamsData.push(pastExamData);
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
