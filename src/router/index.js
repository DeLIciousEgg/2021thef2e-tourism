import { createRouter, createWebHashHistory } from 'vue-router'
import { tourismType } from '@/utils/config'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/search/:type',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
    beforeEnter: (to, from) => {
      return Object.keys(tourismType).includes(to.params.type)
    },
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/Category.vue')
      },
      {
        path: 'category/:category',
        name: 'CategoryList',
        component: () => import('@/views/CategoryList.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/SearchList.vue')
      }
    ]
  },
  {
    path: '/tourism/:id',
    name: 'Tourism',
    component: () => import('@/views/Tourism.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
