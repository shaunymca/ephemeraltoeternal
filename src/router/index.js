import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'search/:query',
          name: 'Search'
        },
        {
          path: 'message/:timestamp',
          name: 'Message'
        }
      ]
    }
  ]
})
