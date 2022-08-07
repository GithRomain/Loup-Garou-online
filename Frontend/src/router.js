import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/HomePage";

const routes =  [
    {
        path:"/",
        name:"HomePage",
        component: HomePage,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

