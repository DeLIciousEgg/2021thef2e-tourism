<template>
  <section class="w-full">
    <header class="flex justify-between items-center mb-2">
      <h3 class="font-light text-2xl md:text-4xl ml-4">近期活動</h3>
      <router-link to="/search/activity" class="text-more flex font-medium">
        查看更多活動
        <img
          src="@/assets/chevron-right-orange.svg"
          alt="chevron-right"
          class="text-more ml-2"
        />
      </router-link>
    </header>
    <main class="md:flex md:flex-wrap">
      <div v-for="item of recentActivity" :key="item.id" class="mb-4 md:w-1/2 md:px-2 relative">
        <!-- <router-link :to="`/tourism/${item.id}`" class="absolute inset-0 z-10"></router-link> -->
        <div
          class="flex md:border md:border-solid md:border-true-gray md:rounded-2xl md:overflow-hidden group"
        >
          <router-link
            :to="`/tourism/activity/${item.id}`"
            class="w-2/6 h-16 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl md:rounded-none overflow-hidden flex-shrink-0"
          >
            <img
              :src="item.picture.url"
              :alt="item.picture.description"
              class="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform bg-primary"
            />
          </router-link>
          <div
            class="w-4/6 flex flex-col md:py-4 pl-3 md:pr-6 box-border md:border-l-2 md:border-solid md:border-true-gray flex-1"
          >
            <div
              class="text-primary-dark text-xs font-normal md:text-base md:mb-2"
            >{{ item.startTime }} - {{ item.endTime }}</div>
            <router-link
              :to="`/tourism/activity/${item.id}`"
              class="text-black font-bold truncate md:text-xl"
            >{{ item.name }}</router-link>
            <div class="flex justify-between mt-auto">
              <div class="flex items-center">
                <img src="@/assets/marker-gray.svg" alt="Marker" />
                <span class="ml-1 text-primary-dark text-xs font-normal">{{ item.city }}</span>
              </div>
              <router-link :to="`/tourism/activity/${item.id}`" class="flex text-primary">
                詳細介紹
                <img
                  src="@/assets/chevron-right-green.svg"
                  alt="chevron-right"
                  class="text-more ml-2"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { loadActivity } from '@/store/action-types'
export default {
  name: 'HomeActivity',
  components: {
  },
  setup () {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch(loadActivity)
    })

    return {
      recentActivity: computed(() => store.getters.recentActivity)
    }
  }
}
</script>
