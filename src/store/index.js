import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    student:{
      studentIdName:window.localStorage
          .getItem('student' || '[]') ==null
          ? '未登录'  : JSON.parse(window.localStorage
              .getItem('student' || '[]')).studentIdName,
      username: window.localStorage.getItem('student') == null
          ? '' : JSON.parse(window.localStorage.getItem('student' || '[]')).username

    },
    adminMenus: []
  },
  mutations: {
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    },
    login(state,student){
      state.student = student;
      window.localStorage.setItem('student',JSON.stringify(student))
    },
    logout (state) {
      // 注意不能用 null 清除，否则将无法判断 user 里具体的内容
      state.student = [];
      window.localStorage.removeItem('student')
      state.adminMenus = []

    },


  },
  actions: {
  },
  modules: {
  },

})
