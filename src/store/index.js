import { createStore } from 'vuex'
import { SCENIC_SPOT, RESTAURANT, ACTIVITY, SEARCH_SCENIC_SPOT, SEARCH_RESTAURANT, SEARCH_ACTIVITY } from './mutation-types'
import { loadScenicSpot, loadRestaurant, loadActivity, searchScenicSpot, searchRestaurant, searchActivity } from './action-types'
import { tourismType } from '@/utils/config'
import { getTourism } from '@/api/tourism'
import { sampleSize } from 'lodash-es'

export default createStore({
  state: {
    scenicSpot: [],
    restaurant: [],
    activity: [],
    searchScenicSpot: [],
    searchRestaurant: [],
    searchActivity: []
  },
  mutations: {
    [SCENIC_SPOT] (state, payload) {
      state.scenicSpot = payload
    },
    [RESTAURANT] (state, payload) {
      state.restaurant = payload
    },
    [ACTIVITY] (state, payload) {
      state.activity = payload
    },
    [SEARCH_SCENIC_SPOT] (state, payload) {
      state.searchScenicSpot = payload
    },
    [SEARCH_RESTAURANT] (state, payload) {
      state.searchRestaurant = payload
    },
    [SEARCH_ACTIVITY] (state, payload) {
      state.searchActivity = payload
    }
  },
  actions: {
    async [loadScenicSpot] ({ commit, state }) {
      if (state.scenicSpot.length) return
      const res = await getTourism(tourismType.scenicSpot, {
        top: 100,
        skip: Math.floor(Math.random() * 500),
        filter: 'Picture/PictureUrl1 ne null and City ne null'
      })
      commit(SCENIC_SPOT, res)
    },
    async [loadRestaurant] ({ commit, state }) {
      if (state.restaurant.length) return
      const res = await getTourism(tourismType.restaurant, {
        top: 100,
        skip: Math.floor(Math.random() * 500),
        filter: 'Picture/PictureUrl1 ne null and City ne null'
      })
      commit(RESTAURANT, res)
    },
    async [loadActivity] ({ commit, state }) {
      if (state.activity.length) return
      const res = await getTourism(tourismType.activity, {
        top: 100,
        skip: Math.floor(Math.random() * 50),
        filter: 'Picture/PictureUrl1 ne null and City ne null'
      })
      commit(ACTIVITY, res)
    },
    async [searchScenicSpot] ({ commit, state }, { filter }) {
      const res = await getTourism(tourismType.scenicSpot, {
        top: 30,
        filter: filter
      })
      commit(SEARCH_SCENIC_SPOT, res)
    },
    async [searchRestaurant] ({ commit, state }, { filter }) {
      const res = await getTourism(tourismType.restaurant, {
        top: 30,
        filter: filter
      })
      commit(SEARCH_RESTAURANT, res)
    },
    async [searchActivity] ({ commit, state }, { filter }) {
      const res = await getTourism(tourismType.activity, {
        top: 30,
        filter: filter
      })
      commit(SEARCH_ACTIVITY, res)
    }
  },
  getters: {
    carousel (state) {
      const arr = sampleSize(state.scenicSpot, 6)
      const carousel = arr.map(item => {
        return {
          id: item.ID,
          name: item.Name,
          city: item.City,
          picture: {
            url: item.Picture.PictureUrl1,
            description: item.Picture.PictureDescription1
          }
        }
      })
      return carousel
    },
    recentActivity (state) {
      const arr = state.activity.filter(item => {

      })
      arr = sampleSize(state.activity, 4)
      const carousel = arr.map(item => {
        return {
          id: item.ID,
          name: item.Name,
          city: item.City,
          picture: {
            url: item.Picture.PictureUrl1,
            description: item.Picture.PictureDescription1
          }
        }
      })
      return carousel
    }
  }
})
