import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

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
const router = createRouter({
    routes,
    history: createWebHashHistory()
});


router.beforeEach((to, next)=>{
    const authRequiredRoutes =["HomePage"];
    const authNotRequiredRoutes =["LoginPage","RegisterPage"];
    const _isAuthenticated= store.getters._isAuthenticated;

    if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false); //login olduktan sonra LoginPage ve RegisterPage'e yönlendirmiyor


    if(authRequiredRoutes.indexOf(to.name) > -1 )
    {
        if(_isAuthenticated) next(); // eğer koşulları sağlıyorsa next deyip devam edecek
        else next({name:"LoginPage"}); //eğer authenticated olmadıysa logine yönlendiriyoruz
    }else{
        next();
    }

});
export default router;