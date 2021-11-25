<template>
  <swiper
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :pagination="{
      clickable: true
    }"
    loop
    autoplay
    class="w-full h-48 sm:h-60 md:h-96"
  >
    <swiper-slide
      v-if="loading"
      class="w-full h-full relative rounded-3xl overflow-hidden skeleton"
    />
    <template v-else>
      <img class="swiper-button-prev" src="@/assets/arrow-left.svg" alt="slider-left" />
      <img class="swiper-button-next" src="@/assets/arrow-right.svg" alt="arrow-right" />
      <swiper-slide
        v-for="item of list"
        :key="item.id"
        class="w-full h-full relative rounded-3xl overflow-hidden"
      >
        <router-link :to="`/tourism/scenicSpot/${item.id}`" class="absolute inset-0"></router-link>
        <img
          :src="item.picture.url"
          :alt="item.picture.description"
          class="w-full h-full object-cover object-center bg-primary"
        />
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-xl md:text-2xl text-white"
        >{{ item.city }} | {{ item.name }}</div>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script>
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
SwiperCore.use([Navigation, Pagination, Autoplay])

export default {
  name: 'HomeSwiper',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style scoped>
.swiper-container-horizontal:deep(.swiper-pagination-bullets) {
  @apply hidden sm:flex justify-end pr-7 pb-5 space-x-1;
}
.swiper-container-horizontal:deep(.swiper-pagination-bullet) {
  @apply w-4 h-4 bg-gray-900;
}
.swiper-container-horizontal:deep(.swiper-pagination-bullet-active) {
  @apply bg-white;
}
</style>
