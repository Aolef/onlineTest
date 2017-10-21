import Vue from 'vue'
import Router from 'vue-router'
import testBasic from '../components/testBasic'
import importTest from '../components/importTest'
import studentBasic from '../components/studentBasic'
import test from '../components/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/testBasic',
      component: testBasic
    },
    {
      path: '/importTest',
      component: importTest
    },
    {
      path: '/studentBasic',
      component: studentBasic
    },
    {
      path:'/test',
      component:test
    }
  ]
})
