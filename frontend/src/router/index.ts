import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Transaction from "../pages/Transaction.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/transaction/register", component: Transaction },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;