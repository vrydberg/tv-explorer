import { createRouter, createWebHistory } from 'vue-router'
import ExplorerView from '../views/ExplorerView.vue'
import TvShowView from '@/views/TvShowView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Change this to home later
      path: '/',
      name: 'explorer',
      component: ExplorerView,
    },

    {
      path: '/tv/:id',
      name: 'tvShow',
      component: TvShowView
    }
    // {


    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
