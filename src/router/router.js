import MainPage from "@/pages/MainPage"
import WeatherPage from "@/pages/WeatherPage"
import GraphicPage from "@/pages/GraphicPage"
import AuthPage from "@/pages/AuthPage"
import UserProfile from "@/pages/UserProfile"
import { createRouter, createWebHashHistory } from "vue-router";
// import { useAuthStore } from "@/stores/authStore";



const routes = [
    {
        path: "/",
        component: MainPage
    },
    {
        path: "/weather",
        component: WeatherPage
    },
    {
        path: "/graphics",
        component: GraphicPage,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/auth",
        component: AuthPage
    },
    {
        path: "/user",
        component: UserProfile,
        meta: {
            requiresAuth: true,
        }
    },
]


const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})



router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    // const store = useAuthStore();
    if (requiresAuth && !localStorage.getItem('user')) {
        next('/auth');
    } else {
        next();
    }
})


export default router;