<template>
  <div class="group" @click="$emit('click')">
    <div
      class="rounded-2xl overflow-hidden w-56 h-40 sm:w-60 sm:h-44 md:w-64 md:h-52"
      :class="imgClass"
    >
      <img
        :src="img"
        :alt="imgDescription"
        class="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform bg-primary"
      />
    </div>
    <div class="text-lg md:text-xl font-bold mt-2 text-black">{{ name }}</div>
    <div class="flex items-center">
      <img src="@/assets/marker-gray.svg" alt="Marker" />
      <span class="ml-1 text-primary-dark text-xs font-normal">{{ city }}</span>
    </div>
  </div>
</template>

<script>
// import { computed } from 'vue'
export default {
  name: 'BaseCard',
  props: {
    img: {
      type: String,
      default: require('@/assets/default-img.png')
    },
    imgDescription: {
      type: String,
      default: ''
    },
    imgClass: {
      type: String
    },
    name: {
      type: String
    },
    city: {
      type: String
    }
  },
  emits: ['click']
}
</script>
