<template>
  <div class="py-4 flex justify-center md:justify-between md:px-11 md:py-6">
    <h1>
      <router-link to="/">
        <img src="@/assets/Logo-mobile.png" alt="臺灣走走" class="md:hidden" />
        <img src="@/assets/Logo-desktop.png" alt="臺灣走走" class="hidden md:inline" />
      </router-link>
    </h1>
    <nav class="my-auto">
      <div
        class="bg-gray-50 opacity-70 fixed inset-0 md:hidden z-10"
        v-show="open"
        @click="open = false"
      ></div>
      <div
        class="w-0 h-0 opacity-0 md:shadow-none md:rounded-none md:opacity-100 md:w-auto md:h-auto md:static"
        :class="{ 'fixed top-0 right-0 bg-white shadow-md rounded-bl-3xl w-72 h-auto opacity-100 transition-all z-20': open }"
      >
        <img src="@/assets/Logo-mobile.png" alt="臺灣走走" class="ml-7 mt-4 md:hidden" />
        <ul class="md:flex md:space-x-5">
          <li
            v-for="item of tourismTypeList"
            :key="item.id"
            class="text-center text-primary-dark text-lg border-solid hover:text-primary hover:border-b hover:border-highlight"
            :class="{ 'border-b border-trueGray-200 last:border-0 md:border-none': open }"
          >
            <router-link
              :to="`/search/${item.id}/category`"
              :class="{ 'block px-auto py-6 md:p-0': open }"
              @click="open = false"
            >{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <button
      class="bg-primary-light rounded-xl w-12 h-12 fixed top-2 right-2 focus:outline-none p-2.5 md:hidden z-30"
      @click="open = !open"
    >
      <span class="sr-only">Open main menu</span>
      <div class="flex flex-col justify-center items-end">
        <span
          class="block absolute transform w-5 h-1 bg-white transition duration-500 ease-in-out"
          :class="{ 'w-7 rotate-45': open, ' -translate-y-2': !open }"
        ></span>
        <span
          class="block absolute transform origin-center w-7 h-1 bg-white transition duration-500 ease-in-out"
          :class="{ 'opacity-0': open }"
        ></span>
        <span
          class="block absolute transform w-5 h-1 bg-white transition duration-500 ease-in-out"
          :class="{ 'w-7 -rotate-45': open, ' translate-y-2': !open }"
        ></span>
      </div>
    </button>
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
