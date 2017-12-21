import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import worker from '@/router/worker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...worker
  ]
})
