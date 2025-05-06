import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import RegisterUser from "../pages/RegisterUser.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/user/register", component: RegisterUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;