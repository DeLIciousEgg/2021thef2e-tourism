<template>
  <div
    class="flex flex-col md:flex-row md:justify-center md:mt-20 px-4 md:px-24 lg:px-36 mb-9 md:mb-14"
  >
    <home-title />
    <home-search />
  </div>
</template>

<script>
import HomeTitle from '@/components/HomeTitle'
import HomeSearch from '@/components/HomeSearch'
export default {
  name: 'Tourism',
  components: {
    HomeTitle,
    HomeSearch
  },
  setup () {
  }
}
</script>
