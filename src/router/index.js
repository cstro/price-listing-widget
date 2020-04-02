import Vue from 'vue'
import VueRouter from 'vue-router'
import PriceListing from '../views/PriceListing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'price-listing',
    component: PriceListing
  },
]

const router = new VueRouter({
  routes
})

export default router
