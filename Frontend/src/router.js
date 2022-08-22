import { createWebHistory, createRouter } from "vue-router";
import HomePage from "./components/HomePage";
import UserRegister from "./components/UserConnect";
import NavBar from "./components/NavBar";

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
    {
        path:"/NavBar",
        name:"NavBar",
        component: NavBar,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

