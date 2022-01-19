import { config, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CourseSearch from "./CourseSearch.vue";
import FontAwesomeIcon from "@/plugins/fontawesome-icons";

config.global.components = { FontAwesomeIcon };

describe("CourseSearch test", () => {
  test("trigger checkbox should display a menu", async () => {
    const wrapper = mount(CourseSearch);
    const advanceSearch = wrapper.find("#advanceSearch");
    expect(advanceSearch.exists()).toBe(true);
    const searchOptions = wrapper.find("#searchOptions");
    expect(searchOptions.isVisible()).toBe(false);
    await advanceSearch.setValue(true);
    await nextTick();
    expect(searchOptions.isVisible()).toBe(true);
  });
});
