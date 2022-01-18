import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import AnimationBackground from "./AnimationBackground.vue";

jest.setTimeout(10000);

describe("AnimationBackground test", () => {
  test("should render the image", async () => {
    const img1 = "test-img1";
    const img2 = "test-img2";
    const wrapper = mount(AnimationBackground, {
      props: { backgroundImages: [img1, img2] },
    });
    const backgroundBlock = wrapper.find("div");
    expect(backgroundBlock.exists()).toBe(true);
    expect(backgroundBlock.attributes("style")).toContain(`url(${img1})`);
  });
  test("image should change after 7 seconds", async () => {
    const img1 = "test-img1";
    const img2 = "test-img2";
    const wrapper = mount(AnimationBackground, {
      props: { backgroundImages: [img1, img2] },
    });
    const backgroundBlock = wrapper.find("div");
    expect(backgroundBlock.attributes("style")).toContain(`url(${img1})`);
    await new Promise((resolve) => setTimeout(resolve, 7000));
    await nextTick();
    expect(backgroundBlock.attributes("style")).toContain(`url(${img2})`);
  });
});
