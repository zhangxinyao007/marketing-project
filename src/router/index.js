import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Index from '@/components/Index'
import Detail from '@/components/Detail'

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
        },
        {
          path: 'detail',
          name: 'Detail',
          component: Detail
        }
      ]
    }
  ]
})

export default router
