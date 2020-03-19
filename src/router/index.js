import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/components/Login";
import AppIndex from "@/components/AppIndex";
import ClassroomIndex from "@/components/ClassRoom/ClassroomIndex";
import PersonalIndex from "@/components/Personal/PersonalIndex";
import NoticeIndex from "@/components/Notice/NoticeIndex";
import Register from "@/components/Register";

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        // home页面并不需要被访问
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'AppIndex',
                component: AppIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/classroom',
                name:'ClassRoom',
                component: ClassroomIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/personal',
                name:'Personal',
                component: PersonalIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/Notice',
                name:'Notice',
                component: NoticeIndex,
                meta: {
                    requireAuth: true
                }
            }

        ]
    },
    {
        path:'/reg',
        name:'Register',
        component:Register,
        meta: {
            requireAuth: true
        }
    },
   // {
   //     path: '/',
   //     name: 'Home',
   //     component: Home,
   //
   // },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
