<template>
  <div class="px-4 md:px-11 mb-9 mt-6 md:mt-14">
    <div
      class="w-full h-48 sm:h-60 md:h-96 relative rounded-2xl overflow-hidden mb-4"
      :class="{ 'skeleton': isLoad.tourism }"
    >
      <img
        v-if="!isLoad.tourism"
        :src="data.picture.url"
        :alt="data.picture.description"
        class="w-full h-full object-cover object-center bg-primary"
      />
    </div>
    <template v-if="isLoad.tourism">
      <div class="skeleton w-32 h-7 md:w-48 md:h-10 mb-2"></div>
      <div
        class="skeleton max-w-full h-5 mb-2 w-"
        :class="[`w-${n}`]"
        v-for="n of ['1/4', '4/5', '2/3', 'full']"
        :key="n"
      ></div>
    </template>
    <template v-if="!isLoad.tourism">
      <h2 class="font-light text-2xl md:text-4xl mb-2 md:mb-4">{{ data.name }}</h2>
      <router-link
        v-for="(item, index) of data.classList"
        :key="item + index"
        :to="`/search/${$route.params.type}/category/${item}`"
        class="text-tag text-sm md:text-xl font-normal rounded-3xl border border-solid border-tag px-3 py-1 mr-2"
      ># {{ item }}</router-link>
      <div class="mt-4 text-black">
        <span class="text-lg md:text-xl font-medium mb-2">{{ data.tourismName }}介紹：</span>
        <p class="font-light leading-7 md:leading-8 md:text-lg">{{ data.description }}</p>
      </div>
    </template>
  </div>
  <template v-if="!isLoad.tourism">
    <div class="mt-8 md:px-11 mb-9 lg:flex">
      <div class="bg-block py-8 px-4 md:rounded-xl lg:w-1/2">
        <div v-for="item of data.infomation" :key="item.label" class="flex mb-2">
          <span class="font-bold text-black text-lg flex-shrink-0">{{ item.label }}：</span>
          <div>
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              class="underline font-normal text-primary-link"
            >{{ item.value }}</a>
            <div v-else class="font-normal">{{ item.value }}</div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 px-4 lg:pl-5 mt-3 lg:mt-0">
        <div
          class="bg-primary-light rounded-xl h-64 text-white text-2xl flex justify-center items-center"
        >Map</div>
      </div>
    </div>
  </template>

  <card-block
  class="mb-16 md:mb-28"
    :loading="otherDataLoading"
    :title="`不能錯過的${tourismName}`"
    :moreLabel="`查看更多${tourismName}`"
    :list="otherDataList"
    @click-more="$router.push(`/search/${$route.params.type}`)"
    @click-card="$router.push(`/tourism/${$route.params.type}/${$event}`)"
  ></card-block>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTourism } from '@/api/tourism'
import { dateFormat, tourismType } from '@/utils/config'
import CardBlock from '@/components/CardBlock'
import useTourismType from '@/composables/useTourismType'

const tourismNameMap = {
  scenicSpot: '景點',
  restaurant: '餐廳',
  activity: '活動'
}

const columns = {
  scenicSpot: [
    { label: '開放時間', key: 'OpenTime' },
    { label: '服務電話', key: 'Phone' },
    { label: '景點地址', key: 'Address', link: true },
    { label: '官方網站', key: 'WebsiteUrl', link: true },
    { label: '票價資訊', key: 'TicketInfo' },
    { label: '注意事項', key: 'Remarks' }
  ],
  restaurant: [
    { label: '營業時間', key: 'OpenTime' },
    { label: '聯絡電話', key: 'Phone' },
    { label: '餐廳地址', key: 'Address', link: true },
    { label: '官方網站', key: 'WebsiteUrl', link: true }
  ],
  activity: [
    { label: '活動時間', key: ['startTime', 'endTime'] },
    { label: '聯絡電話', key: 'Phone' },
    { label: '主辦單位', key: 'Organizer' },
    { label: '活動地點', key: 'Address', link: true },
    { label: '官方網站', key: 'WebsiteUrl', link: true },
    { label: '活動費用', key: 'Charge' },
    { label: '注意事項', key: 'Remarks' }
  ]
}
export default {
  name: 'Tourism',
  components: {
    CardBlock
  },
  setup () {
    const route = useRoute()
    const isLoad = reactive({
      tourism: true
    })
    const tourismData = ref({})
    const tourismName = ref(tourismNameMap[route.params.type])

    const loadTourismData = async (type, id) => {
      isLoad.tourism = true
      const res = await getTourism(tourismType[type], {
        top: 1,
        filter: `ID eq '${id}'`
      })
      if (res[0]) {
        tourismData.value = res[0]
      }
      isLoad.tourism = false
    }

    const classList = computed(() => {
      const list = []
      const count = ['', 1, 2, 3]
      count.forEach(n => {
        if (`Class${n}` in tourismData.value) {
          list.push(tourismData.value[`Class${n}`])
        }
      })
      return list
    })

    const picture = computed(() => {
      return {
        url: tourismData.value.Picture && tourismData.value.Picture.PictureUrl1
          ? tourismData.value.Picture.PictureUrl1
          : require('@/assets/default-img.png'),
        description: tourismData.value.Picture && tourismData.value.Picture.PictureDescription1
          ? tourismData.value.Picture.PictureDescription1
          : tourismData.value.Name
      }
    })

    const infomation = computed(() => {
      const column = columns[route.params.type]
      const info = []
      const data = tourismData.value
      column.forEach(item => {
        const { label, key, link } = item
        if (link) {
          if (!data[key]) return
          if (item.key === 'Address') {
            if (data.Position && data.Position.PositionLat && data.Position.PositionLon) {
              info.push({
                label,
                value: data[key],
                href: data.Position && data.Position.PositionLat && data.Position.PositionLon
                  ? `https://www.google.com/maps/dir/${data.Position.PositionLat},${data.Position.PositionLon}` : ''
              })
            }
          } else {
            info.push({ label, value: data[key], href: data[key] })
          }
        } else {
          if (Array.isArray(key)) {
            if (!data[key[0]] && data[key[1]]) return

            info.push({ label, value: dateFormat(data[key[0]]) + '-' + dateFormat(data[key[1]]) })
          } else {
            if (!data[key]) return
            info.push({ label, value: data[key] })
          }
        }
      })

      return {
        info
      }
    })

    const data = computed(() => {
      return {
        name: tourismData.value.Name,
        picture: picture.value,
        classList: classList.value,
        description: tourismData.value.Description,
        infomation: infomation.value.info,
        tourismName: tourismName.value
      }
    })

    watch(
      () => route.params,
      async (params) => {
        await loadTourismData(route.params.type, route.params.id)
      },
      {
        immediate: true
      }
    )

    const { loading, getList } = useTourismType(route.params.type)

    return {
      tourismName,
      tourismData,
      data,
      isLoad,
      otherDataLoading: loading,
      otherDataList: computed(() => getList(6))
    }
  }
}
</script>
