<template>
  <div class="text-center px-4 mt-6 mb-6 md:mb-14 md:flex">
    <base-select
      class="w-full md:w-60 mb-2 md:mb-0"
      default-label="全部縣市"
      :options="cityList"
      label-key="name"
      id-key="value"
      v-model="query.city" />
    <base-input class="w-full mb-2 md:mb-0 md:mx-4" placeholder="想找有趣的？請輸入關鍵字" v-model="query.text" />
    <base-button class="w-full md:w-52" @click="searchHandler">
      <img src="@/assets/Search.svg" alt="Search" class="mr-3 w-7 h-7" />
      <span class="font-bold tracking-widest">搜 尋</span>
    </base-button>
  </div>
  <router-view></router-view>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import { cityList } from '@/utils/config'
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Search',
  components: {
    BaseButton,
    BaseInput,
    BaseSelect
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    const query = reactive({
      city: route.query.city,
      text: route.query.text
    })

    const searchHandler = () => {
      const q = {}
      if (query.city) q.city = query.city
      if (query.text) q.text = query.text

      router.push({
        path: `/search/${route.params.type}/list`,
        query: q
      })
    }
    return {
      cityList,
      query,
      searchHandler
    }
  }
}
</script>
