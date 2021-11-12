<template>
  <div class="py-4 flex justify-center md:justify-between md:px-11 md:py-6">
    <h1>
      <router-link to="/">
        <img src="@/assets/Logo-mobile.png" alt="臺灣走走" class="md:hidden"/>
        <img src="@/assets/Logo-desktop.png" alt="臺灣走走" class="hidden md:inline"/>
      </router-link>
    </h1>
    <nav class="my-auto">
      <ul class="hidden md:flex md:space-x-5">
        <li v-for="item of tourismTypeList" :key="item.id" class="text-primary-dark hover:text-primary-link text-lg">
          <router-link :to="`/search/${item.id}/category`">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
      <button class="bg-primary-light rounded-xl w-12 h-12 fixed top-2 right-2 focus:outline-none p-2.5" @click="open = !open">
        <span class="sr-only">Open main menu</span>
        <div class="flex flex-col justify-center items-end">
          <span
            class="block absolute transform w-5 h-1 bg-white transition duration-500 ease-in-out"
            :class="{'w-7 rotate-45': open,' -translate-y-2': !open }">
          </span>
          <span
            class="block absolute transform origin-center w-7 h-1 bg-white transition duration-500 ease-in-out"
            :class="{'opacity-0': open }">
            </span>
          <span
            class="block absolute transform w-5 h-1 bg-white transition duration-500 ease-in-out"
            :class="{'w-7 -rotate-45': open,' translate-y-2': !open }">
          </span>
        </div>
      </button>
    </nav>
  </div>
</template>

<script>
import { tourismTypeList } from '@/utils/config'
import { ref } from 'vue'
export default {
  name: 'Header',
  setup () {
    const open = ref(false)
    return {
      tourismTypeList,
      open
    }
  }
}
</script>
