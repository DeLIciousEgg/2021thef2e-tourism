<template>
  <input
    type="text"
    class="px-7 py-3 bg-block border border-solid border-true-gray-200 rounded-md focus:outline-primary text-primary font-bold"
    placeholder="請輸入"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseInput',
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>
