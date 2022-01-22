import { config, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CourseSearch from "./CourseSearch.vue";
import FontAwesomeIcon from "@/plugins/fontawesome-icons";
import { CourseData } from "./CourseData";

config.global.components = { FontAwesomeIcon };

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

describe("CourseSearch test", () => {
  test("trigger checkbox should display a menu", async () => {
    const wrapper = mount(CourseSearch, {
      props: {
        coursesData: coursesData,
      },
    });
    await nextTick();
    const advanceSearch = wrapper.find("#advanceSearch");
    expect(advanceSearch.exists()).toBe(true);
    const searchOptions = wrapper.find("#searchOptions");
    expect(searchOptions.isVisible()).toBe(false);
    await advanceSearch.setValue(true);
    await nextTick();
    expect(searchOptions.isVisible()).toBe(true);
  });
  test("should generate search option from props", async () => {
    const wrapper = mount(CourseSearch, {
      props: {
        coursesData: coursesData,
      },
    });
    for (const courseData of coursesData) {
      const optionSemester = wrapper.find(
        `.s${courseData.year}-${courseData.semester}`
      );
      expect(optionSemester.exists()).toBe(true);
      const optionDepartment = wrapper.find(`.${courseData.departmentName}`);
      expect(optionDepartment.exists()).toBe(true);
    }
  });
});
