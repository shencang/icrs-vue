import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from "@/components/Login";
import AppIndex from "@/components/home/AppIndex";
import ClassroomIndex from "@/components/classRoom/ClassroomIndex";
import PersonalIndex from "@/components/personal/PersonalIndex";
import NoticeIndex from "@/components/notice/NoticeIndex";
import Register from "@/components/Register";
import AdminIndex from "@/components/admin/AdminIndex";
import DashBoard from "@/components/admin/dashboard/admin/index"
import Editor from "@/components/admin/content/ArticleEditor"
import Articles from '../components/jotter/Articles'
import ArticleDetails from '@/components/jotter/ArticleDetails'
import LibraryIndex from '@/components/library/LibraryIndex'

Vue.use(VueRouter);

const routes = [

    {
        path: '/',
        name: 'Default',
        redirect: '/home',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        // home页面并不需要被访问
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'AppIndex',
                component:  AppIndex

            },
            {
                path: '/classroom',
                name: 'ClassRoom',
                component: ClassroomIndex,

            },
            {
                path: '/jotter',
                name: 'Jotter',
                component: Articles
            },
            {
                path: '/jotter/article',
                name: 'Article',
                component: ArticleDetails
            },
            {
                path: '/admin/content/editor',
                name: 'Editor',
                component: Editor,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/library',
                name: 'Library',
                component: LibraryIndex
            },
            {
                path: '/personal',
                name: 'Personal',
                component: PersonalIndex,
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '/Notice',
                name: 'Notice',
                component: NoticeIndex,
                meta: {
                    requireAuth: true
                }
            },


        ]
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/home/About.vue')
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
                name: 'Dashboard',
                component: DashBoard,
                meta: {
                    requireAuth: true
                }
            }
        ]
    },
    {
        path: '*',
        component: () => import('../components/pages/Error404')
    }

];


const router = new VueRouter({
    mode: 'history',
    routes
});

// 用于创建默认路由
export const createRouter = new VueRouter({
    mode: 'history',
    routes 

});


export default router
