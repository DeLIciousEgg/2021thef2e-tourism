<template>
  <div
    class="flex flex-col md:flex-row md:justify-center md:mt-20 px-4 md:px-24 lg:px-36 mb-9 md:mb-14"
  >
    <home-title />
    <home-search />
  </div>
  <div class="px-4 md:px-11 mb-9">
    <home-activity />
  </div>
  <div class="mb-9">
    <card-block
      title="熱門打卡景點"
      moreLabel="查看更多景點"
      :list="popularScenicSpot"
      @click-more="$router.push('/search/scenicSpot')"
      @click-card="$router.push(`/tourism/scenicSpot/${$event}`)"
    ></card-block>
  </div>
  <div class="mb-9">
    <card-block
      title="一再回訪美食"
      moreLabel="查看更多美食"
      :list="goodRestaurant"
      @click-more="$router.push('/search/restaurant')"
      @click-card="$router.push(`/tourism/restaurant/${$event}`)"
    ></card-block>
  </div>
</template>

<script>
import HomeTitle from '@/components/HomeTitle'
import HomeSearch from '@/components/HomeSearch'
import HomeActivity from '@/components/HomeActivity'
import CardBlock from '@/components/CardBlock'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { loadScenicSpot, loadRestaurant } from '@/store/action-types'
export default {
  name: 'Tourism',
  components: {
    HomeTitle,
    HomeSearch,
    HomeActivity,
    CardBlock
  },
  setup () {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(loadScenicSpot)
      await store.dispatch(loadRestaurant)
    })

    return {
      popularScenicSpot: computed(() => store.getters.popularScenicSpot(4)),
      goodRestaurant: computed(() => store.getters.goodRestaurant)
    }
  }
}
</script>
