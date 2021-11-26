<template>
  <div>
    <h3 v-if="loading" class="skeleton w-32 h-7 md:w-48 md:h-10 ml-4"></h3>
    <h3 v-else class="font-light text-2xl md:text-4xl ml-4">熱門分類</h3>
    <div class="flex flex-wrap mt-4">
      <template v-if="loading">
        <div v-for="n of 2" :key="n" class="px-2 mb-3 w-1/2 h-24 sm:w-1/3 sm:h-28 md:w-64 md:h-32">
          <div class="skeleton w-full h-full rounded-2xl md:rounded-3xl overflow-hidden"></div>
        </div>
      </template>
      <template v-else>
        <router-link
          v-for="(val, key) of categoryList"
          :key="key"
          :to="`/search/${$route.params.type}/category/${key}`"
          class="px-2 mb-3 block w-1/2 h-24 sm:w-1/3 sm:h-28 md:w-64 md:h-32">
          <div class="relative rounded-2xl md:rounded-3xl overflow-hidden w-full h-full">
            <img :src="val.picture.url" :alt="val.picture.description" class="w-full h-full object-cover object-center bg-primary">
            <div class="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center font-bold text-white ">
              {{ key }}
            </div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useTourismType from '@/composables/useTourismType'
export default {
  name: 'Category',
  setup () {
    const route = useRoute()
    const { loading, categoryList } = useTourismType(route.params.type)

    return {
      loading,
      categoryList
    }
  }
}
</script>
