import { createRouter, createWebHashHistory } from 'vue-router'
import { tourismType } from '@/utils/config'

const isTourismType = (type) => {
  Object.keys(tourismType).includes(type)
}

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
      return isTourismType(to.params.type)
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
    path: '/tourism/:type/:id',
    name: 'Tourism',
    component: () => import('@/views/Tourism.vue'),
    beforeEnter: (to, from) => {
      return isTourismType(to.params.type)
    }
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
