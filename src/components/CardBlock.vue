<template>
  <section class="w-full px-4 md:px-11">
    <header class="flex justify-between items-center mb-2">
      <h3 class="font-light text-2xl md:text-4xl ml-4">{{ title }}</h3>
      <a class="text-more flex font-medium" @click="$emit('click-more')">
        {{ moreLabel }}
        <img
          src="@/assets/chevron-right-orange.svg"
          alt="chevron-right"
          class="text-more ml-2"
        />
      </a>
    </header>
    <div class="flex space-x-6 overflow-x-scroll md:overflow-x-auto w-full">
      <base-card
        class
        v-for="item of list"
        :key="item.id"
        :img="item.picture.url"
        :imgDescription="item.picture.description"
        :name="item.name"
        :city="item.city"
        @click="$emit('click-card', item.id)"
      ></base-card>
    </div>
  </section>
</template>

<script>
import BaseCard from '@/components/BaseCard'
export default {
  name: 'CardBlock',
  props: {
    title: {
      type: String
    },
    moreLabel: {
      type: String,
      default: '查看更多'
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['click-more', 'click-card'],
  components: {
    BaseCard
  }
}
</script>
