import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SecondPage from '@/components/second-page'
import AboutUs from '@/components/about-us'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/second-page',
      name: 'Second Page',
      component: SecondPage
    },
    {
      path: '/about-us',
      name: 'About us',
      component: AboutUs
    }
  ]
})
