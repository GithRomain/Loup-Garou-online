import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserConnect";

const routes =  [
    {
        path:"/",
        name:"UserRegister",
        component: UserRegister,
    },
    {
        path:"/HomePage",
        name:"HomePage",
        component: HomePage,
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

