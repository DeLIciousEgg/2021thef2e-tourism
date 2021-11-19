import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'

export default function useRestaurant () {
  const store = useStore()
  const restaurantLoading = ref(true)

  onMounted(async () => {
    await store.dispatch('getRestaurant')
    restaurantLoading.value = false
  })

  return {
    restaurantLoading,
    goodRestaurant: store.getters.goodRestaurant,
    categoryRestaurant: store.getters.categoryRestaurant
  }
}
