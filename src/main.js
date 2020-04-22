import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
const axiosQ = require('axios');
axiosQ.defaults.baseURL='http://localhost:8443/api';
axiosQ.defaults.withCredentials = true;
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios =axiosQ;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);


//使用钩子函数判断是否拦截,在访问每一个路由前调用

router.beforeEach((to, from, next) => {
      if (store.state.student.studentIdName && to.path.startsWith('/admin')) {
        axiosQ.get('/authentication').then(resp => {
          initAdminMenu(router, store);
          if (resp)console.log("?")
        })
      }
      if (to.meta.requireAuth) {
        if (store.state.student.studentIdName) {
          axiosQ.get('/authentication').then(resp => {
            if (resp) next()
          });
         // next()
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
);

// http response 拦截器
axiosQ.interceptors.response.use(
    response => {
      return response
    },
    error => {
      console.log(error.response);
      if (error) {
        router.replace('/login').then(r => {
          console.log(r.fullPath)
        })
      }
      // 返回接口返回的错误信息
      return Promise.reject(error.response.data)
    });

const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  axiosQ.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      const fmtRoutes = formatRoutes(resp.data);
      router.addRoutes(fmtRoutes);
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      meta: {
        requireAuth: true
      },
      children: route.children
    };
    fmtRoutes.push(fmtRoute)
  });
  return fmtRoutes
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
