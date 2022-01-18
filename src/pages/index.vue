<template>
  <fullpage-header class="bg-black">
    <div
      class="h-full w-full bg-local bg-center bg-cover"
      :style="{
        'background-image': 'url(' + backgroundImages[backgroundIndex] + ')',
        opacity: backgroundOpacity,
      }"
    ></div>
    <div class="absolute top-1/2 -translate-y-1/2 w-screen h-1/2 text-white">
      <div class="center-container w-3/5 flex">
        <div class="h-full w-1/2 font-sans">
          <h1 class="text-7xl font-bold">NCU+</h1>
          <h3 class="mt-5 text-2xl">中央大學智慧校園系統</h3>
          <h4 class="mt-3 text-base">
            A new hope at the place where Nobody Care U.
          </h4>
        </div>
        <div class="h-full w-1/2"></div>
      </div>
    </div>
  </fullpage-header>
  <section class="h-screen w-full"></section>
  <section class="h-96 w-full bg-slate-800 flex items-center">
    <div class="h-4/5 w-full">
      <div class="center-container w-3/5 text-white text-center">
        <h1 class="text-2xl">About NCU+</h1>
        <p></p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FullpageHeader from "@/components/FullpageHeader.vue";
import bgImg1 from "@/assets/background/中大湖.png";
import bgImg2 from "@/assets/background/飛碟.png";
import bgImg3 from "@/assets/background/總圖.jpg";
import bgImg4 from "@/assets/background/男十三.jpg";
import bgImg5 from "@/assets/background/操場.jpg";
import bgImg6 from "@/assets/background/櫻花.png";
import { ref } from "vue";
import TWEEN from "@tweenjs/tween.js";

const backgroundImages = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6];
const backgroundIndex = ref(0);
const backgroundOpacity = ref(0);

const tween = new TWEEN.Tween({ opacity: 0 })
  .to({ opacity: 1 }, 2000)
  .onUpdate(({ opacity }) => {
    backgroundOpacity.value = opacity;
  })
  .onComplete(() => {
    setTimeout(() => {
      tweenBack.start();
    }, 2000);
  });

const tweenBack = new TWEEN.Tween({ opacity: 1 })
  .to({ opacity: 0 }, 2000)
  .onUpdate(({ opacity }) => {
    backgroundOpacity.value = opacity;
  })
  .onComplete(() => {
    backgroundIndex.value =
      (backgroundIndex.value + 1) % backgroundImages.length;
    setTimeout(() => {
      tween.start();
    }, 2000);
  });

tween.start();

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
}

animate();
</script>
