import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Good from '@/components/Good'
import Bad from '@/components/Bad'
import Haha from '@/components/Haha'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Haha
    },
    {
      path: "/good",
      component: Good,
    }, 
    {
      path: "/bad",
      component: Bad,
    }
  ]
})
