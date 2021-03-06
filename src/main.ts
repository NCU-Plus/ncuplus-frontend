import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { createRouter, createWebHistory } from "vue-router";
import routes from "~pages";
import FontAwesomeIcon from "@/plugins/fontawesome-icons";
import { key, store } from "@/plugins/store";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store, key)
  .directive("click-outside", {
    beforeMount(el, binding) {
      document.addEventListener("click", binding.value(el));
    },
    beforeUnmount(el, binding) {
      document.removeEventListener("click", binding.value(el));
    },
  })
  .mount("#app");
