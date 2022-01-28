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
              <td
                @click="showPastCourses"
                class="text-slate-800 cursor-pointer"
              >
                查看歷年相同課程<font-awesome-icon
                  v-if="!showingPastCourses"
                  class="ml-2"
                  :icon="['fas', 'caret-down']"
                />
                <font-awesome-icon
                  v-else
                  class="ml-2"
                  :icon="['fas', 'caret-up']"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="w-3/4 h-fit text-center">
          <tbody>
            <tr class="border-t-[1px] border-slate-300">
              <td class="p-2">學期</td>
              <td class="p-2">系所</td>
              <td class="p-2">編號</td>
              <td class="p-2">選別</td>
              <td class="p-2">修課上限</td>
              <td class="p-2">時間</td>
              <td class="p-2">密碼卡</td>
            </tr>
            <tr class="border-t-[1px] border-slate-300">
              <td class="p-2">
                {{ courseData.year }}-{{ formatSemester(courseData.semester) }}
              </td>
              <td class="p-2">{{ courseData.departmentName }}</td>
              <td class="p-2">{{ courseData.serialNo }}</td>
              <td class="p-2">{{ formatCourseType(courseData.courseType) }}</td>
              <td class="p-2">{{ courseData.limitCnt }}</td>
              <td class="p-2">{{ courseData.classTimes }}</td>
              <td class="p-2">
                {{ formatPasswordCard(courseData.passwordCard) }}
              </td>
            </tr>
            <tr
              v-show="showingPastCourses"
              v-for="pastCourseData of pastCoursesData"
              class="border-t-[1px] border-slate-300"
            >
              <td class="p-2">
                {{ pastCourseData.year }}-{{
                  formatSemester(pastCourseData.semester)
                }}
              </td>
              <td class="p-2">{{ pastCourseData.departmentName }}</td>
              <td class="p-2">{{ pastCourseData.serialNo }}</td>
              <td class="p-2">
                {{ formatCourseType(pastCourseData.courseType) }}
              </td>
              <td class="p-2">{{ pastCourseData.limitCnt }}</td>
              <td class="p-2">{{ pastCourseData.classTimes }}</td>
              <td class="p-2">
                {{ formatPasswordCard(pastCourseData.passwordCard) }}
              </td>
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
        @add="add('comment', courseData.classNo, $event.content, commentsData)"
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
        @add="add('review', courseData.classNo, $event.content, reviewsData)"
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
        @upload="uploadPastExam(courseData.classNo, $event, pastExamsData)"
        @download="downloadPastExam($event.id, pastExamsData)"
        @delete="deletePastExam($event.id, pastExamsData)"
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
import axios, { AxiosResponse } from "axios";
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
  downloadPastExam,
  deletePastExam,
} from "@/helpers/course-feedback";
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
const showingPastCourses = ref(false);
const pastCourses = [] as any[];
const pastCoursesData = reactive([] as any[]);

onBeforeMount(async () => {
  const course = await axios.get(
    process.env.VITE_APP_API_URL + `/courses/${props.id}`
  );
  courseData.value = { ...(await mapCourseData([course.data.data]))[0] };
  const courseFeedback = await axios.get(
    process.env.VITE_APP_API_URL +
      `/course-feedback/${courseData.value.classNo}`
  );
  if (courseFeedback.data.data.comments)
    for (const commentData of courseFeedback.data.data.comments)
      commentsData.push(commentData);
  if (courseFeedback.data.data.reviews)
    for (const reviewData of courseFeedback.data.data.reviews)
      reviewsData.push(reviewData);
  if (courseFeedback.data.data.pastExams)
    for (const pastExamData of courseFeedback.data.data.pastExams)
      pastExamsData.push(pastExamData);
  if (courseFeedback.data.data.courseInfos)
    for (const pastCourse of courseFeedback.data.data.courseInfos)
      pastCourses.push(pastCourse);
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

async function showPastCourses() {
  showingPastCourses.value = !showingPastCourses.value;
  if (showingPastCourses.value && pastCoursesData.length === 0) {
    const tasks: Promise<AxiosResponse<any, any>>[] = [];
    for (const pastCourse of pastCourses) {
      if (pastCourse.courseId != props.id)
        tasks.push(
          axios.get(
            process.env.VITE_APP_API_URL + `/courses/${pastCourse.courseId}`
          )
        );
    }
    for (const data of await Promise.all(tasks)) {
      pastCoursesData.push({ ...(await mapCourseData([data.data.data]))[0] });
    }
  }
}
</script>
