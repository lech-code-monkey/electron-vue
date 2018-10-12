import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: resolve => require.ensure([], () => resolve(require('@/components/LandingPage')))
    },
    {
      path: '/rangewindow',
      name: 'range0-window',
      component: resolve => require.ensure([], () => resolve(require('@/components/RangeWindow')))
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
