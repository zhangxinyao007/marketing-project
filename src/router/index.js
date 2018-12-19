import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      // name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          redirect: '/index'
        },
        {
          path: 'index',
          name: 'Index',
          component: Index
        }
      ]
    }
  ]
})

export default router
