<template>
  <select
    class="px-7 py-3 border-true-gray-200 border border-solid rounded-md text-primary font-bold bg-white h-12"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option disabled value="">{{ defaultLabel }}</option>
    <option
      v-for="option of options"
      :key="option[idKey]"
      :value="option[idKey]"
    >{{ option[labelKey] }}</option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: [String, Number]
    },
    options: {
      type: Array
    },
    idKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    defaultLabel: {
      type: String,
      default: '請選擇'
    }
  },
  emits: ['update:modelValue']
}
</script>
