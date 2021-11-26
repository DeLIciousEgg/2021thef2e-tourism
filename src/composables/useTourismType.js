import { ref } from 'vue'
import useScenicSpot from '@/composables/useScenicSpot'
import useRestaurant from '@/composables/useRestaurant'
import useActivity from '@/composables/useActivity'

export default function (type) {
  let res = {}
  let loading = ref(false)
  let getList = () => []
  let categoryList = null

  switch (type) {
    case 'scenicSpot':
      res = useScenicSpot()
      loading = res.scenicSpotLoading
      getList = res.popularScenicSpot
      console.log(res.popularScenicSpot)
      categoryList = res.categoryScenicSpot
      console.log(res.categoryScenicSpot)
      console.log(categoryList)
      break

    case 'restaurant':
      res = useRestaurant()
      loading = res.restaurantLoading
      getList = res.goodRestaurant
      categoryList = res.categoryRestaurant
      break

    case 'activity':
      res = useActivity()
      loading = res.activityLoading
      getList = res.recentActivity
      categoryList = res.categoryActivity
      break
  }

  return {
    loading,
    getList,
    categoryList
  }
}
