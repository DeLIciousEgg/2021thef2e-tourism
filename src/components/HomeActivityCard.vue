<template>
  <div class="mb-4 md:w-1/2 md:px-2 relative">
    <div
      class="flex md:border md:border-solid md:border-true-gray md:rounded-2xl md:overflow-hidden group"
    >
      <a
        href="javascript:;"
        class="w-2/6 h-16 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl md:rounded-none overflow-hidden flex-shrink-0"
        :class="{ 'skeleton': loading }"
        @click="$emit('click')"
      >
        <img
          v-if="!loading"
          :src="data.picture.url"
          :alt="data.picture.description"
          class="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform bg-primary"
        />
      </a>
      <div
        class="w-4/6 flex flex-col md:py-4 pl-3 md:pr-6 box-border md:border-l-2 md:border-solid md:border-true-gray flex-1"
      >
        <div v-if="loading" class="skeleton w-20 h-4"></div>
        <div
          v-else
          class="text-primary-dark text-xs font-normal md:text-base md:mb-2"
        >{{ data.startTime }} - {{ data.endTime }}</div>
        <a
          href="javascript:;"
          class="text-black font-bold truncate md:text-xl"
          :class="{ 'skeleton w-48 h-5 mt-2': loading }"
          @click="$emit('click')"
        >{{ data.name }}</a>
        <div class="flex justify-between mt-auto">
          <div v-if="loading" class="skeleton w-20 h-4 mt-2"></div>
          <div v-else class="flex items-center">
            <img src="@/assets/marker-gray.svg" alt="Marker" />
            <span class="ml-1 text-primary-dark text-xs font-normal">{{ data.city }}</span>
          </div>
          <a v-if="!loading" href="javascript:;" class="flex text-primary" @click="$emit('click')">
            詳細介紹
            <img
              src="@/assets/chevron-right-green.svg"
              alt="chevron-right"
              class="text-more ml-2"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeActivity',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click']
}
</script>
