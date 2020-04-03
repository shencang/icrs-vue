import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/components/Login";
import AppIndex from "@/components/AppIndex";
import ClassroomIndex from "@/components/ClassRoom/ClassroomIndex";
import PersonalIndex from "@/components/Personal/PersonalIndex";
import NoticeIndex from "@/components/Notice/NoticeIndex";
import Register from "@/components/Register";
import AdminIndex from "@/components/admin/AdminIndex";
import DashBoard from "@/components/admin/dashboard/admin/index"
import Editor from "@/components/admin/content/ArticleEditor"
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
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminIndex,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '/admin/dashboard',
                name: 'dashboard',
                component: DashBoard,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '/admin/content/editor',
        name: 'Editor',
        component: Editor,
        meta: {
            requireAuth: true
        }
    }
];


const router = new VueRouter({
    mode: 'history',
    routes
});

// eslint-disable-next-line no-unused-vars
const createRouter = new VueRouter({
    mode:'history',
    routerD
});
const routerD =[{
    path: '/',
    name: 'Default',
    redirect: '/home',
    component: Home
},
    {
        // home页面并不需要被访问，只是作为其它组件的父组件
        path: '/home',
        name: 'Home',
        component: Home,
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'AppIndex',
                component: AppIndex
            },
            {
                path: '/admin/content/editor',
                name: 'Editor',
                component: Editor,
                meta: {
                    requireAuth: true
                }
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminIndex,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: '/admin/dashboard',
                name: 'dashboard',
                component: DashBoard,
                meta: {
                    requireAuth: true
                }
            }
        ]
    }];

export default router
