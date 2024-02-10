import { createRouter, createWebHashHistory } from "vue-router";
const routes=[
    {
        name:"HomePage",
        path: "/",
        component : ()  => import("@/views/Home.vue")
    },
    {
        name:"LoginPage",
        path: "/login",
        component : ()  => import("@/views/Login.vue")
    },
    {
        name:"RegisterPage",
        path: "/register",
        component : ()  => import("@/views/Register.vue")
    },
    {
        name:"NewBookmarkPage",
        path: "/new",
        component : ()  => import("@/views/NewBookmark.vue")
    },
];
export default createRouter({
    routes,
    history: createWebHashHistory()
})