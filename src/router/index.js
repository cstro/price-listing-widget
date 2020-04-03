import Vue from 'vue'
import VueRouter from 'vue-router'
import PriceListing from '../views/PriceListing.vue'
import ResumeQuote from '../views/ResumeQuote.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'price-listing',
    component: PriceListing,
  },
  {
    path: '/resume-quote',
    name: 'resume-quote',
    component: ResumeQuote,
  },
]

const router = new VueRouter({
  routes
})

export default router
