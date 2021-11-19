<template>
  <div
    class="flex flex-col md:flex-row md:justify-center md:mt-20 px-4 md:px-24 lg:px-36 mb-9 md:mb-14"
  >
    <home-title />
    <home-search />
  </div>
  <div class="px-4 md:px-11 mb-9">
    <home-swiper :list="swiperList" :loading="scenicSpotLoading" class="mb-9" />
    <home-activity />
  </div>
  <div class="mb-9">
    <card-block
      :loading="scenicSpotLoading"
      title="熱門打卡景點"
      moreLabel="查看更多景點"
      :list="popularScenicSpot"
      @click-more="$router.push('/search/scenicSpot')"
      @click-card="$router.push(`/tourism/scenicSpot/${$event}`)"
    ></card-block>
  </div>
  <div class="mb-9">
    <card-block
      :loading="restaurantLoading"
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
import HomeSwiper from '@/components/HomeSwiper'
import CardBlock from '@/components/CardBlock'
import { computed } from 'vue'
import useScenicSpot from '@/composables/useScenicSpot'
import useRestaurant from '@/composables/useRestaurant'
export default {
  name: 'Tourism',
  components: {
    HomeTitle,
    HomeSearch,
    HomeActivity,
    HomeSwiper,
    CardBlock
  },
  setup () {
    const { scenicSpotLoading, popularScenicSpot } = useScenicSpot()
    const { restaurantLoading, goodRestaurant } = useRestaurant()

    return {
      scenicSpotLoading,
      restaurantLoading,
      swiperList: computed(() => popularScenicSpot(6)),
      popularScenicSpot: computed(() => popularScenicSpot(6)),
      goodRestaurant: computed(() => goodRestaurant(6))
    }
  }
}
</script>
