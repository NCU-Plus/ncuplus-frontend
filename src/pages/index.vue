<template>
  <fullpage-header class="bg-black">
    <animation-background
      :backgroundImages="backgroundImages"
      :duration="{ enter: 2000, leave: 2000, stay: 2000 }"
    />
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
import AnimationBackground from "@/components/AnimationBackground.vue";

const backgroundImages = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5, bgImg6];
</script>
