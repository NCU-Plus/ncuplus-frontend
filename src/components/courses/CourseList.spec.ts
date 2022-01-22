import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { CourseData } from "./CourseData";
import CourseList from "./CourseList.vue";

const coursesData: CourseData[] = [
  {
    id: 1,
    year: 110,
    semester: 0,
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
    id: 2,
    year: 110,
    semester: 1,
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
      const tr = wrapper.find(
        `#c${courseData.year}-${courseData.semester}-${courseData.serialNo}`
      );
      expect(tr.exists()).toBe(true);
    }
  });
  test("70 courses should have 3 page, and 25 per page", async () => {
    const data: CourseData[] = [];
    for (let i = 0; i < 70; i++) {
      data.push({ ...coursesData[0], serialNo: i + 1 });
    }
    const wrapper = mount(CourseList, {
      props: {
        coursesData: data,
      },
    });
    for (let i = 0; i < 70; i++) {
      if (i !== 0 && i % 25 === 0) {
        wrapper.find("li#go-next-page").trigger("click");
        await nextTick();
      }
      const trExist = wrapper.find(
        `tr#c${data[i].year}-${data[i].semester}-${data[i].serialNo}`
      );
      expect(trExist.exists()).toBe(true);
      if (i > 25) {
        const trNotExist = wrapper.find(
          `tr#c${data[i - 25].year}-${data[i - 25].semester}-${
            data[i - 25].serialNo
          }`
        );
        expect(trNotExist.exists()).toBe(false);
      }
      if (i < 70 - 25) {
        const trNotExist = wrapper.find(
          `tr#c${data[i + 25].year}-${data[i + 25].semester}-${
            data[i + 25].serialNo
          }`
        );
        expect(trNotExist.exists()).toBe(false);
      }
    }
    for (let i = 0; i < 70; i++) {
      wrapper.find("input#page-input").setValue(Math.floor(i / 25) + 1);
      await nextTick();
      const trExist = wrapper.find(
        `tr#c${data[i].year}-${data[i].semester}-${data[i].serialNo}`
      );
      expect(trExist.exists()).toBe(true);
      if (i > 25) {
        const trNotExist = wrapper.find(
          `tr#c${data[i - 25].year}-${data[i - 25].semester}-${
            data[i - 25].serialNo
          }`
        );
        expect(trNotExist.exists()).toBe(false);
      }
      if (i < 70 - 25) {
        const trNotExist = wrapper.find(
          `tr#c${data[i + 25].year}-${data[i + 25].semester}-${
            data[i + 25].serialNo
          }`
        );
        expect(trNotExist.exists()).toBe(false);
      }
    }
  });
});
