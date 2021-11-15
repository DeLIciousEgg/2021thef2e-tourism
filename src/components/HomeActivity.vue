<template>
  <section class="w-full">
    <header class="flex justify-between items-center mb-2">
      <h3 v-if="isLoad.activity" class="skeleton w-32 h-7 md:w-48 md:h-10"></h3>
      <h3 v-else class="font-light text-2xl md:text-4xl ml-4">近期活動</h3>
      <router-link v-if="!isLoad.activity" to="/search/activity" class="text-more flex font-medium">
        查看更多活動
        <img
          src="@/assets/chevron-right-orange.svg"
          alt="chevron-right"
          class="text-more ml-2"
        />
      </router-link>
    </header>
    <main class="md:flex md:flex-wrap">
      <template v-if="isLoad.activity">
        <home-activity-card v-for="n of 4" :key="n" loading />
      </template>
      <template v-else>
        <home-activity-card
          v-for="item of recentActivity"
          :key="item.id"
          :data="item"
          @click="$router.push(`/tourism/activity/${item.id}`)"
        />
      </template>
    </main>
  </section>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { loadActivity } from '@/store/action-types'
import HomeActivityCard from '@/components/HomeActivityCard'
export default {
  name: 'HomeActivity',
  components: {
    HomeActivityCard
  },
  setup () {
    const store = useStore()
    const isLoad = reactive({
      activity: true
    })

    onMounted(async () => {
      await store.dispatch(loadActivity)
      isLoad.activity = false
    })

    return {
      isLoad,
      recentActivity: computed(() => store.getters.recentActivity)
    }
  }
}
</script>
