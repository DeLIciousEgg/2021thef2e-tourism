import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

export default function useActivity () {
  const store = useStore()
  const activityLoading = ref(true)

  onMounted(async () => {
    await store.dispatch('getActivity')
    activityLoading.value = false
  })

  return {
    activityLoading,
    recentActivity: store.getters.recentActivity,
    categoryActivity: store.getters.categoryActivity
  }
}
