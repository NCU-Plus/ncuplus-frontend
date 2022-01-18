<template>
  <div
    class="h-full w-full bg-local bg-center bg-cover"
    :style="{
      'background-image': 'url(' + backgroundImages[backgroundIndex] + ')',
      opacity: backgroundOpacity,
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TWEEN from "@tweenjs/tween.js";

const props = defineProps<{
  backgroundImages: string[];
}>();

const backgroundIndex = ref(0);
const backgroundOpacity = ref(1);

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
      (backgroundIndex.value + 1) % props.backgroundImages.length;
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
