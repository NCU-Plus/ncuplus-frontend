import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

console.log(routes);

createApp(App).use(router).mount("#app");
