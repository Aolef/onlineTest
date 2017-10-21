import Vue from 'vue'
import Router from 'vue-router'
import testBasic from '../components/testBasic'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/testBasic',
      component: testBasic
    }
  ]
})
