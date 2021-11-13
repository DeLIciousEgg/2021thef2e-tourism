<template>
  <div class="text-center">
    <base-select class="w-full mb-2" :options="tourismTypeList" label-key="name" v-model="type" />
    <base-input class="w-full mb-2" placeholder="你想去哪裡？請輸入關鍵字" v-model="text" />
    <base-button class="w-full" @click="searchHandler">
      <img src="@/assets/Search.svg" alt="Search" class="mr-3" />
      <span class="font-bold tracking-widest">搜 尋</span>
    </base-button>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import { ref } from 'vue'
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
    const text = ref('')
    const type = ref(tourismTypeList[0].id)
    const searchHandler = () => {
      const query = {}
      if (text.value) query.q = text.value
      router.push({
        path: `/search/${type.value}/list`,
        query: query
      })
    }

    return {
      text,
      type,
      searchHandler,
      tourismTypeList
    }
  }
}
</script>
