<template>
  <form class="text-center" @submit="searchHandler">
    <base-select class="w-full mb-2" :options="tourismTypeList" label-key="name" v-model="query.type" />
    <base-input class="w-full mb-2" placeholder="你想去哪裡？請輸入關鍵字" v-model="query.text" />
    <base-button class="w-full" @click="searchHandler">
      <img src="@/assets/Search.svg" alt="Search" class="mr-3 w-7 h-7" />
      <span class="font-bold tracking-widest">搜 尋</span>
    </base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import { reactive } from 'vue'
import { tourismTypeList } from '@/utils/config'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeSearch',
  components: {
    BaseButton,
    BaseInput,
    BaseSelect
  },
  setup () {
    const router = useRouter()
    const query = reactive({
      type: tourismTypeList[0].id,
      text: ''
    })
    const searchHandler = () => {
      const q = {}
      if (query.text) q.text = query.text
      router.push({
        path: `/search/${query.type}/list`,
        query: q
      })
    }

    return {
      query,
      searchHandler,
      tourismTypeList
    }
  }
}
</script>
