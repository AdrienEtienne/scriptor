import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import registry from '@/router/registry'
import sandbox from '@/router/sandbox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...registry,
    ...sandbox
  ]
})
