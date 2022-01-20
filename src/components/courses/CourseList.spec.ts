import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { CourseData } from "./CourseData";
import CourseList from "./CourseList.vue";

const coursesData: CourseData[] = [
  {
    year: 110,
    semester: "上",
    serialNo: 10,
    classNo: "C8763",
    title: "星爆系統",
    credit: 3,
    passwordCard: "ALL",
    teachers: "桐谷和人, 亞絲娜",
    classTimes: "8-7, 6-3",
    limitCnt: 10,
    admitCnt: 0,
    waitCnt: 54,
    collegeName: "艾恩葛朗特學院",
    departmentName: "刀劍學系",
    courseType: "REQUIRED",
  },
  {
    year: 110,
    semester: "下",
    serialNo: 11,
    classNo: "聖母聖詠",
    title: "十一連擊",
    credit: 2,
    passwordCard: "OPTIONAL",
    teachers: "絕劍",
    classTimes: "8-7, 6-3",
    limitCnt: 35,
    admitCnt: 0,
    waitCnt: 40,
    collegeName: "ALO學院",
    departmentName: "絕劍學系",
    courseType: "ELECTIVE",
  },
];

describe("CourseList test", () => {
  test("an array of CourseData should render a table", async () => {
    const wrapper = mount(CourseList, {
      props: {
        coursesData: coursesData,
      },
    });

    for (const courseData of coursesData) {
      const tr = wrapper.find(`#${courseData.semester + courseData.serialNo}`);
      expect(tr.exists()).toBe(true);
    }
  });
});
