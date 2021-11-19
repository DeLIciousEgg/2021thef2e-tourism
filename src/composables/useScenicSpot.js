import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

export default function useScenicSpot () {
  const store = useStore()
  const scenicSpotLoading = ref(true)

  onMounted(async () => {
    await store.dispatch('getScenicSpot')
    scenicSpotLoading.value = false
  })

  return {
    scenicSpotLoading,
    popularScenicSpot: store.getters.popularScenicSpot,
    categoryScenicSpot: store.getters.categoryScenicSpot
  }
}
