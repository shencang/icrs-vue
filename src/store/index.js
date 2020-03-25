import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    student:{
      studentIdName:window.localStorage
          .getItem('student' || '[]') ==null
          ? '' : JSON.parse(window.localStorage
              .getItem('student' || '[]')).studentIdName
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
      state.student = [];
      window.localStorage.removeItem('student')
    },


  },
  actions: {
  },
  modules: {
  },

})
